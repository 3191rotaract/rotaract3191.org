# Google Sheets form backend — setup

One Google Sheet + one Apps Script Web App deployment serves every form on
the site. Each form's Netlify Function sends its data to its own tab in the
same spreadsheet.

## 1. Create the spreadsheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **"Rotaract 3191 — Form Responses"**.
3. You don't need to create any tabs/columns by hand — the script creates a
   tab (and its header row) the first time a form submits to it.

## 2. Add the Apps Script

1. In the spreadsheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `myFunction() {}` code.
3. Paste in the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) from this repo.
4. Click the disk icon (or Ctrl+S) to save. Name the project, e.g. "Form Backend".

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: anything, e.g. "v1"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
     - This is required — the Netlify Function calls this URL anonymously.
       It does not expose your spreadsheet publicly; the URL only accepts
       `POST` requests shaped like `{ sheetName, fields }` and only writes
       rows. It can't read data back out or be browsed like a normal page.
4. Click **Deploy**.
5. The first time you deploy, Google will ask you to **authorize** the
   script — click through the "unverified app" warning (it's your own
   script) and grant access.
6. Copy the **Web app URL** shown after deploying. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Tell the site about the URL

Open `netlify/functions/_lib/sheetsConfig.mjs` and replace the placeholder:

```js
export const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE'
```

with your real `/exec` URL. Commit and deploy (push to the branch Netlify
builds from) — that's the only value you need to change.

No Netlify environment variable is needed; the URL is a plain constant in
that one file.

## 5. Re-deploying the Apps Script later

If you ever edit `Code.gs` again (e.g. to tweak the logic), you must create
a **new deployment version** for the changes to go live:

1. **Deploy → Manage deployments**
2. Click the pencil/edit icon on the existing deployment
3. Under "Version", choose **New version**
4. Click **Deploy**

The Web App URL stays the same across versions, so you won't need to update
`sheetsConfig.mjs` again unless you create a brand new deployment.

## Adding a future form

No Apps Script changes are needed for a new form — the script auto-creates
a tab per `sheetName`. To add a new form to the site:

1. Add a new Netlify Function, e.g. `netlify/functions/submit-my-new-form.js`:
   ```js
   import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'

   export default createSheetsFormHandler({
     sheetName: 'My New Form',       // becomes the tab name in the sheet
     fields: [
       { name: 'name', required: true, maxLength: 120 },
       // ...
     ],
     // optional — reject a submission if this column already holds the
     // same value (case-insensitive) in an existing row
     uniqueFields: [
       { name: 'phone', message: 'This contact number has already been used.' },
     ],
   })
   ```
2. Add a new page in `src/pages/`, following `DlaChairNominations.jsx` as a
   template — it uses the shared pieces in `src/components/forms/` (`FormField`,
   `FormPageHeader`, `FormSectionHeader`, `FormSuccessMessage`, `inputClasses`)
   and the existing `useFormSubmit('submit-my-new-form')` hook, so you're only
   writing the field list and copy, not new styling or fetch logic.
3. Register the route in `src/App.jsx`.

If you later add a field to an **existing** form, add the matching column
header to that tab in the sheet yourself (or delete the tab so the script
recreates it with fresh headers) — the script won't add new columns to an
existing tab automatically.

## Viewing responses

Just open the spreadsheet — each form's submissions land in their own tab,
newest at the bottom, with a Timestamp column first.
