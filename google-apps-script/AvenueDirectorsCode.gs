/**
 * Google Apps Script Web App backend for the Avenue Directors Data form.
 *
 * This is deployed against its own spreadsheet, separate from the main
 * rotaract3191.org form-responses sheet. The Netlify function
 * `submit-avenue-directors-data` posts { sheetName, fields, uniqueFields }
 * where sheetName is the avenue the submitter picked — each avenue gets its
 * own tab, created automatically (with a header row) the first time someone
 * submits for that avenue.
 *
 * `uniqueFields` (optional) is a list of { name, message } — before
 * appending, the script scans the tab's existing rows for that column
 * already holding the same value (case-insensitive) and rejects the
 * submission with `message` if found. Used here to stop the same RI ID
 * being submitted twice for the same avenue.
 *
 * Setup: paste this into the Apps Script project bound to the new
 * spreadsheet, then deploy it as a Web App (see GOOGLE_SHEETS_SETUP.md in
 * the repo root) and paste the resulting /exec URL into
 * netlify/functions/_lib/sheetsConfig.mjs as AVENUE_DIRECTORS_SCRIPT_URL.
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
    const uniqueFields = body.uniqueFields || [];

    if (!sheetName) {
      return jsonOutput({ ok: false, error: 'Missing sheetName' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(['Timestamp', ...Object.keys(fields)]);
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

    // Row values are aligned to the sheet's existing header order (not the
    // order keys arrive in), so manually reordering columns in the sheet is
    // safe. Any field sent that has no matching header column is dropped —
    // add the column header yourself if you add a field to the form later.
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

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
