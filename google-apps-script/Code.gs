/**
 * Google Apps Script Web App backend for all rotaract3191.org forms.
 *
 * One deployment serves every form on the site. Each Netlify Function posts
 * { sheetName, fields, files, uniqueFields } — this script writes each
 * form's rows to its own tab (creating the tab and header row the first
 * time it sees a new sheetName), so adding a brand-new form later needs
 * zero changes here: just point a new Netlify Function at a new sheetName.
 *
 * `files` (optional) is a map of fieldName -> { name, mimeType, data }
 * (data is base64). Each is uploaded to a Drive folder scoped to the form
 * (see uploadFileAndGetUrl), and its share link is folded into `fields`
 * under that same field name before the row is built — so from the sheet's
 * point of view a photo column looks just like any text column.
 *
 * `uniqueFields` (optional) is a list of { name, message } — before
 * appending, the script scans the tab's existing rows for that column
 * already holding the same value (case-insensitive) and rejects the
 * submission with `message` if found. Used e.g. to stop the same phone
 * number nominating twice.
 *
 * Setup: paste this into the Apps Script project bound to your spreadsheet,
 * then deploy it as a Web App (see GOOGLE_SHEETS_SETUP.md in the repo root).
 * Forms that upload files need the Drive scope authorized too — you'll be
 * prompted for it the first time a file-upload form actually submits, or
 * you can trigger the prompt yourself by running any function once from
 * the Apps Script editor.
 */
function doPost(e) {
  // Serialize submissions so two near-simultaneous requests can't both pass
  // the duplicate check before either has appended its row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const body = JSON.parse(e.postData.contents);
    const sheetName = body.sheetName;
    const fields = body.fields || {};
    const files = body.files || {};
    const uniqueFields = body.uniqueFields || [];

    if (!sheetName) {
      return jsonOutput({ ok: false, error: 'Missing sheetName' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(['Timestamp', ...Object.keys(fields), ...Object.keys(files)]);
      sheet.setFrozenRows(1);
    }

    const lastColumn = sheet.getLastColumn();
    const headerRow = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    const lastRow = sheet.getLastRow();

    if (uniqueFields.length > 0 && lastRow > 1) {
      const existingRows = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();

      for (const unique of uniqueFields) {
        const colIndex = headerRow.indexOf(unique.name);
        if (colIndex === -1 || !Object.prototype.hasOwnProperty.call(fields, unique.name)) {
          continue;
        }

        const newValue = String(fields[unique.name]).trim().toLowerCase();
        if (!newValue) continue;

        const isDuplicate = existingRows.some(
          (row) => String(row[colIndex]).trim().toLowerCase() === newValue
        );

        if (isDuplicate) {
          return jsonOutput({
            ok: false,
            error: unique.message || `${unique.name} has already been submitted.`,
          });
        }
      }
    }

    // Upload any files to Drive and fold their share links into `fields`
    // so the row-building step below treats them like any other column.
    for (const fieldName of Object.keys(files)) {
      const file = files[fieldName];
      if (!file || !file.data) continue;
      fields[fieldName] = uploadFileAndGetUrl(sheetName, fieldName, file);
    }

    // Row values are aligned to the sheet's existing header order (not the
    // order keys arrive in), so manually reordering columns in the sheet is
    // safe. Any field sent that has no matching header column is dropped —
    // add the column header yourself if you add a field to an existing form.
    const row = headerRow.map((header) => {
      if (header === 'Timestamp') return new Date();
      return Object.prototype.hasOwnProperty.call(fields, header) ? fields[header] : '';
    });

    sheet.appendRow(row);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Saves a base64 file into Drive/Rotaract 3191 Form Uploads/<sheetName>/ and
// returns a share link (anyone with the link can view). Each Drive call
// here is a network round-trip the caller is waiting on synchronously, so
// this is written to minimize them: the folder is looked up by ID (cached
// in Script Properties) instead of by name after the first submission, and
// link sharing is granted once on the folder itself — files inside a
// link-shared Drive folder inherit its view access, so there's no need to
// share each file individually.
function uploadFileAndGetUrl(sheetName, fieldName, file) {
  const formFolder = getOrCreateFormFolder(sheetName);

  const blob = Utilities.newBlob(
    Utilities.base64Decode(file.data),
    file.mimeType || 'application/octet-stream',
    file.name || fieldName
  );

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const driveFile = formFolder.createFile(blob);
  driveFile.setName(timestamp + '_' + fieldName + '_' + driveFile.getName());

  return driveFile.getUrl();
}

function getOrCreateFormFolder(sheetName) {
  const props = PropertiesService.getScriptProperties();
  const cacheKey = 'folder:' + sheetName;
  const cachedId = props.getProperty(cacheKey);

  if (cachedId) {
    try {
      return DriveApp.getFolderById(cachedId);
    } catch (err) {
      // Cached ID no longer resolves (e.g. folder was deleted by hand) —
      // fall through and recreate it below.
    }
  }

  const rootFolder = getOrCreateFolder(DriveApp.getRootFolder(), 'Rotaract 3191 Form Uploads');
  const formFolder = getOrCreateFolder(rootFolder, sheetName);
  formFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  props.setProperty(cacheKey, formFolder.getId());
  return formFolder;
}

function getOrCreateFolder(parent, name) {
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) return existing.next();
  return parent.createFolder(name);
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
