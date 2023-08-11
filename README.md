# getting-started

This code is from the [Quickstart guide](https://flatfile.com/docs/quickstart) for getting started with Flatfile. It has been updated to include a larger target template, as well as additional validations + transformations, to show the power and performance of Flatfile.

## Setup Local Environment Variables

Rename `.env.example` to `.env` and update to your credentials. This file should look like:

- FLATFILE_ENVIRONMENT_ID=us_env_1234
- FLATFILE_API_KEY=sk_1234
- WEBHOOK_SITE_URL=https://webhook.site/1234

You can find the FLATFILE_ENVIRONMENT_ID and the FLATFILE_API_KEY in the Developer Settings section of the Flatfile Dashboard.
[webhook.site](https://webhook.site) is a convenient and easy way to test the content of webhooks. When you go to the site it will automatically create a webhook endpoint for you to use for this test.

Finally, you'll want to update the node package dependencies by running `npm i` from the root directory.

## Developing

Run `npm run dev` to run local development, if you're interested in seeing a real-time stream of events. This is how we recorded timestamps for each event processing in Flatfile to set our performance benchmarks.

## Deploying

Alternatively, you can deploy this build to Flatfile using `npm run deploy`, in case you want to see any performance or behavior changes when Flatfile is subscribed to the Event bus as opposed to your local machine.

## Testing

Use the test files in this [public Google Drive folder](https://drive.google.com/drive/folders/1e0gDKrVuX9IlBp-dzESemgwDwlx1QsJp) to try out different sized data payloads. Whether developing or deploying, once you've run your command, log into the Flatfile dashboard (platform.flatfile.com), click "Create Space" from the environement to which you are pointing this configuration, name your Space whatever you like, and then click "Import" to upload whatever size file you like to begin the test.

## See all code examples

To see all of the code examples from the docs and explore more types of Flatfile workflows, head to the [flatfile-docs-kitchen-sink](https://github.com/FlatFilers/flatfile-docs-kitchen-sink) repo.
