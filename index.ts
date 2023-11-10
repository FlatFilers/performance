/**
 * See all code examples: https://github.com/FlatFilers/flatfile-docs-kitchen-sink
 */
import { Client } from "@flatfile/listener";
import api from "@flatfile/api";
import { JobResponse } from "@flatfile/api/api";
import { ZipExtractor } from "@flatfile/plugin-zip-extractor";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { JSONExtractor } from "@flatfile/plugin-json-extractor";

export default function flatfileEventListener(listener: Client) {

  // SET UP THE SPACE - This autoconfigures the Space using the template in blueprint.ts
  listener.on('**', async (event) => {
    const timestamp = new Date();
    console.log(`Event topic: ${JSON.stringify(event.topic)} | Timestamp: ${timestamp} `)
    const { jobId } = event.context
    let job: JobResponse
    if (jobId) {
      job = await api.jobs.get(jobId)
      console.log(`Job type: ${JSON.stringify(job.data.type, null, 2)} | Job operation: ${JSON.stringify(job.data.operation, null, 2)} | Job status: ${JSON.stringify(job.data.status, null, 2)}`)
    }
  })

  listener.filter({ job: 'space:configure' }, (configure) => {
    configure.on('job:ready', async (event) => {
      const { spaceId, environmentId, jobId } = event.context
      await api.jobs.ack(jobId, {
        info: 'Creating Space',
        progress: 10,
      })

      const timestamp = new Date();

      // ADD WORKBOOK TO SPACE
        const updatedSpace = await api.spaces.update(spaceId, {
          environmentId: environmentId,
          metadata: {
            theme: {
              root: {
                primaryColor: "#00263E",
              },
              sidebar: {
                logo: "https://media.licdn.com/dms/image/C4D0BAQFi757SbjmWrQ/company-logo_200_200/0/1646169798107/loyal_health_logo?e=1707955200&v=beta&t=s0C4u-O-yVS3zpBNmcJCG6qPurynwJYMCQExnodx4mY",
              },
            },
            sidebarConfig: {
              showDataChecklist: false,
            },
          }
        })

      const welcomepage = await api.documents.create(spaceId,{
        title: 'How to use this app',
        body:
        '# Welcome\n' +
        '![Loyal logo](https://media.licdn.com/dms/image/C4D0BAQFi757SbjmWrQ/company-logo_200_200/0/1646169798107/loyal_health_logo?e=1707955200&v=beta&t=s0C4u-O-yVS3zpBNmcJCG6qPurynwJYMCQExnodx4mY)\n' +
        "## We built this quick and simple app for you to transform JSON into CSV files.\n" +
        "Simply navigate to the Files section on the left side bar.\n" +
        'Upload your JSON file.\n' +
        'Then you should see the file appear in the "Available downloads" subheader within files.\n' +
        'Let us know how we can help extend this further! Mike Denenberg, mike.d@flatfile.io.\n' +
        '---\n',
      })

      await api.jobs.complete(jobId, {
        info: 'This space is completed.',
      })
    })
    // Handle the 'job:failed' event
    configure.on('job:failed', async (event) => {
      console.log('Space Config Failed: ' + JSON.stringify(event))
    })
  })

  // TRIGGER SHEET CSV DOWNLOAD ON EXTRACTION COMPLETION
  listener.on(
    'job:ready',
    { operation: 'extract*' },
    async (event: FlatfileEvent) => {
      const { fileId } = event.context
      const { data: file } = await api.files.get(fileId)
      const { data: workbook } = await api.workbooks.get(file.workbookId)
      const sheetId = workbook.sheets[0].id

      try {
        await api.jobs.create({
          type: 'sheet',
          operation: 'export',
          trigger: 'immediate',
          source: sheetId,
          config: {
            options: {
              filter: 'all',
            },
          },
        })
      } catch (error) {
        console.error(error)
      }
    }
  )

  // ZIP FILE SUPPORT
  listener.use(ZipExtractor());

  // EXCEL FILE SUPPORT
  listener.use(ExcelExtractor());

  // JSON FILE SUPPORT
  listener.use(JSONExtractor());

}
