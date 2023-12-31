/**
 * See all code examples: https://github.com/FlatFilers/flatfile-docs-kitchen-sink
 */
import { FlatfileRecord } from "@flatfile/hooks";
import { recordHook } from "@flatfile/plugin-record-hook";
import { FlatfileEvent, Client } from "@flatfile/listener";
import api from "@flatfile/api";
import { JobResponse } from "@flatfile/api/api";
import axios from "axios";
import { blueprint } from "./blueprint";
import { formatRecordDates } from "./dateFormatting";
import { RecordsResponse } from "@flatfile/api/api";
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
      // CREATE WORKBOOK FROM BLUEPRINT
      const createWorkbook = await api.workbooks.create({
        spaceId: spaceId,
        environmentId: environmentId,
        labels: ['primary'],
        name: `${timestamp} Load Test Wide`,
        sheets: blueprint,
        actions: [
          {
            operation: 'submitAction',
            mode: 'foreground',
            label: 'Submit',
            description: 'Send a webhook to the app',
            primary: true,
          },
        ],
      })

      const workbookId = createWorkbook.data?.id

      // ADD WORKBOOK TO SPACE
      if (workbookId) {
        // Need to refresh until update to Spaces to poll for changes
        const updatedSpace = await api.spaces.update(spaceId, {
          environmentId: environmentId,
          primaryWorkbookId: workbookId,
        })
      }

      await api.jobs.complete(jobId, {
        info: 'This space is completed.',
      })
    })
    // Handle the 'job:failed' event
    configure.on('job:failed', async (event) => {
      console.log('Space Config Failed: ' + JSON.stringify(event))
    })
  })

  // ZIP FILE SUPPORT
  listener.use(ZipExtractor());

  // EXCEL FILE SUPPORT
  listener.use(ExcelExtractor());

  // JSON FILE SUPPORT
  // Initialize the JSON extractor
  const jsonExtractor = JSONExtractor();

  // Register the extractor as a middleware for the Flatfile listener
  listener.use(jsonExtractor);

  // DYNAMIC VALIDATIONS WITH THE RECORD HOOK PLUGIN
  listener.use(
    // bulkRecordHook(
    recordHook(
      "orders",
      (record: FlatfileRecord) => {
        // return records.map((record) => {
          // transforms all First Names to lowercase
          const value = record.get("first_name");
          if (typeof value === "string") {
            record.set("first_name", value.toLowerCase());
          }

          // validates all email addresses in the sheet and returns back an error message against them
          const email = record.get("email") as string;
          const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!validEmailAddress.test(email)) {
            console.log("Invalid email address");
            record.addError("email", "Invalid email address");
          }

          // formats all dates to a standard structure
          try {
            formatRecordDates(record, "orders")
          } catch (error) {
            console.log('Error occurred during date formatting:', error)
          }

          return record;
        // });
      }
      ),
      // { chunkSize: 10000, parallel: 10 }
    ),

  // SUBMIT ALL DATA IN THE WORKBOOK TO A WEBHOOK; THIS PAGES THROUGH ALL RECORDS AND BUILDS A RESPONSE CONTAINING ALL DATA
  listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on(
      "job:ready",
      async ({ context: { jobId, workbookId }, payload }: FlatfileEvent) => {
        const sheets = await api.sheets.list({ workbookId });
        let records: RecordsResponse;
        const webhookReceiver =
          process.env.WEBHOOK_SITE_URL ||
          "https://webhook.site/0aff6339-9c0b-4d6c-96ba-16ccf7b3089b"; //update this if you would like to test yourself

        try {
          await api.jobs.ack(jobId, {
            info: "Starting job to submit action to webhook.site",
            progress: 10,
          });

          for (const [index, sheet] of sheets.data.entries()) {
            const recordCount = await api.sheets.getRecordCounts(sheet.id);
            const pages = Math.ceil(recordCount.data.counts.total / 1000);
            const response = await axios.post(
              webhookReceiver,
              {
                data: {
                  "sheetId": sheet.id,
                  "workbookId": workbookId,
                  "pages": pages,
                  "recordcount": recordCount,
                }
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }

          await api.jobs.complete(jobId, {
            outcome: {
              message:
                "Data was successfully submitted to webhook.site. Go check it out at " +
                webhookReceiver +
                ".",
            },
          });

        } catch (error) {
          console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`);
          await api.jobs.fail(jobId, {
            outcome: {
              message:
                "This job failed probably because it couldn't find the webhook.site URL.",
            },
          });
        }
      }
    );
  });
}
