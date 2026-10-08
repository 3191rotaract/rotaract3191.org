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
a **new deployment version** for the changes to go live. This is also true
the first time you deploy a version of `Code.gs` that includes the
file-upload support (used by the Conference Core Team form) — since it now
touches Drive, Google will prompt you to re-authorize the script with an
additional Drive permission on the next deploy/run:

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

### Forms with photo/file uploads

A form can also collect files (e.g. the Conference Core Team form's formal
and casual photographs). Add a `files` option alongside `fields`:

```js
export default createSheetsFormHandler({
  sheetName: 'My New Form',
  fields: [ /* ... */ ],
  files: [
    { name: 'formalPhoto', required: true, maxBytes: 6 * 1024 * 1024, mimePattern: /^image\/(jpeg|jpg|png|webp)$/ },
  ],
})
```

The frontend page reads the file, downscales/re-encodes it client-side via
`src/lib/imageUpload.js` (`fileToUploadPayload`), and sends it as base64
alongside the other fields. `Code.gs` uploads it to
**Drive → Rotaract 3191 Form Uploads → &lt;sheet name&gt;** and writes a
"anyone with the link can view" share URL into that column — no extra Drive
setup needed, the folder is created automatically on first submission.

## Viewing responses

Just open the spreadsheet — each form's submissions land in their own tab,
newest at the bottom, with a Timestamp column first.

## Second sheet: Avenue Directors Data

The Avenue Directors Data form (`/avenue-directors-data`) is deliberately
**not** part of the shared spreadsheet above — it uses its own spreadsheet
and its own Apps Script Web App deployment, so it needs its own setup:

1. Create a new spreadsheet (e.g. **"Rotaract 3191 — Avenue Directors Data"**).
   No need to create tabs by hand — one tab per avenue is created
   automatically the first time someone submits for that avenue.
2. In that spreadsheet, go to **Extensions → Apps Script**, delete the
   placeholder code, and paste in
   [`google-apps-script/AvenueDirectorsCode.gs`](./google-apps-script/AvenueDirectorsCode.gs).
3. Deploy it as a Web App — same steps as section 3 above (**Execute as: Me**,
   **Who has access: Anyone**) — and copy the `/exec` URL.
4. Open `netlify/functions/_lib/sheetsConfig.mjs` and replace:
   ```js
   export const AVENUE_DIRECTORS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE'
   ```
   with that URL. Commit and deploy.

The eleven avenue tabs (Club Service, Community Service, International
Service, Professional Development, Public Image, SAA, Next Gen, Social
Media, Web & Tech, Club Learning Facilitator, Club Foundation Chairman) are
created lazily as each one receives its first submission — you don't need
to pre-create any of them.

## Separate sheet: Top Gun Rotaractors Recognition

The Top Gun Rotaractors Recognition form uses a separate spreadsheet so its
Quarter 1 nominations stay isolated from the other forms.

1. Create a new blank spreadsheet (for example, **"Rotaract 3191 — Top Gun
  Recognition Q1"**).
2. Open **Extensions → Apps Script**, delete the placeholder function, and
  paste the contents of [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
  This backend supports the form's casual-photo upload to Google Drive.
3. Deploy it as a Web App with **Execute as: Me** and **Who has access: Anyone**.
  Authorize the requested Sheets and Drive permissions.
4. Copy the deployed URL ending in `/exec`.
5. In `netlify/functions/_lib/sheetsConfig.mjs`, replace
  `PASTE_YOUR_TOP_GUN_APPS_SCRIPT_WEB_APP_URL_HERE` in
  `TOP_GUN_RECOGNITION_SCRIPT_URL` with that URL.
6. Deploy the website. The form is available at
  `/top-gun-rotaractors-recognition`.

The first submission automatically creates a
**Top Gun Rotaractors Recognition - Q1** tab with columns for the timestamp,
five answers, and the Drive link to the casual photo. The photo is stored in
**Drive → Rotaract 3191 Form Uploads → Top Gun Rotaractors Recognition - Q1**.
If you edit `Code.gs` later, create a new deployment version under
**Deploy → Manage deployments**; the `/exec` URL remains unchanged.
