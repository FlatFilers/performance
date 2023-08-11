/**
 * See all code examples: https://github.com/FlatFilers/flatfile-docs-kitchen-sink
 */

import { recordHook, FlatfileRecord } from "@flatfile/plugin-record-hook";
import { FlatfileEvent, Client } from "@flatfile/listener";
import api from "@flatfile/api";
import axios from "axios";
import { blueprint } from "./blueprint";
import { formatRecordDates } from "./dateFormatting";
import { RecordsResponse } from "@flatfile/api/api";

export default function flatfileEventListener(listener: Client) {

  // SET UP THE SPACE - This autoconfigures the Space using the template in blueprint.ts
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

  // DYNAMIC VALIDATIONS WITH THE RECORD HOOK PLUGIN
  listener.use(
    recordHook("orders", (record: FlatfileRecord) => {
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
    })
  );

  // SUBMIT ALL DATA IN THE WORKBOOK TO A WEBHOOK; THIS PAGES THROUGH ALL RECORDS AND BUILDS A RESPONSE CONTAINING ALL DATA
  listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on(
      "job:ready",
      async ({ context: { jobId, workbookId }, payload }: FlatfileEvent) => {
        const sheets = await api.sheets.list({ workbookId });
        let records: RecordsResponse;
        const webhookReceiver =
          process.env.WEBHOOK_SITE_URL ||
          "https://webhook.site/57b05d59-0b25-4c1d-937e-f892b83f2771"; //update this if you would like to test yourself

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
