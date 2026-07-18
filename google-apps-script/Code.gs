/**
 * Google Apps Script Web App backend for all rotaract3191.org forms.
 *
 * One deployment serves every form on the site. Each Netlify Function posts
 * { sheetName, fields } — this script writes each form's rows to its own tab
 * (creating the tab and header row the first time it sees a new sheetName),
 * so adding a brand-new form later needs zero changes here: just point a new
 * Netlify Function at a new sheetName.
 *
 * Setup: paste this into the Apps Script project bound to your spreadsheet,
 * then deploy it as a Web App (see GOOGLE_SHEETS_SETUP.md in the repo root).
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheetName = body.sheetName;
    const fields = body.fields || {};

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
  }
}

function jsonOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
