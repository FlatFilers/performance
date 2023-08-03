/**
 * See all code examples: https://github.com/FlatFilers/flatfile-docs-kitchen-sink
 */

import { recordHook, FlatfileRecord } from "@flatfile/plugin-record-hook";
import { FlatfileEvent, Client } from "@flatfile/listener";
import api from "@flatfile/api";
import axios from "axios";
import { blueprint } from "./blueprint";

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

  // DYNAMIC VALIDATIONS
  listener.use(
    recordHook("orders", (record: FlatfileRecord) => {
      // transforms all First Names to lowercase
      const value = record.get("first_name");
      if (typeof value === "string") {
        record.set("firstName", value.toLowerCase());
      }

      // validates all email addresses in the sheet and returns back an error message against them
      const email = record.get("email") as string;
      const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmailAddress.test(email)) {
        console.log("Invalid email address");
        record.addError("email", "Invalid email address");
      }

      return record;
    })
  );
  
  // SUBMIT ALL DATA IN THE WORKBOOK TO A WEBHOOK
  listener.filter({ job: "workbook:submitAction" }, (configure) => {
    configure.on(
      "job:ready",
      async ({ context: { jobId, workbookId }, payload }: FlatfileEvent) => {
        const { data: sheets } = await api.sheets.list({ workbookId });

        const records: { [name: string]: any } = {};
        for (const [index, element] of sheets.entries()) {
          records[`Sheet[${index}]`] = await api.records.get(element.id);
        }

        try {
          await api.jobs.ack(jobId, {
            info: "Starting job to submit action to webhook.site",
            progress: 10,
          });

          console.log(JSON.stringify(records, null, 2));

          const webhookReceiver =
            process.env.WEBHOOK_SITE_URL ||
            "https://webhook.site/c83648d4-bf0c-4bb1-acb7-9c170dad4388"; //update this

          const response = await axios.post(
            webhookReceiver,
            {
              ...payload,
              method: "axios",
              sheets,
              records,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            await api.jobs.complete(jobId, {
              outcome: {
                message:
                  "Data was successfully submitted to webhook.site. Go check it out at " +
                  webhookReceiver +
                  ".",
              },
            });
          } else {
            throw new Error("Failed to submit data to webhook.site");
          }
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
