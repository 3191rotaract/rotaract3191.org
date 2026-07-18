import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'

export default createSheetsFormHandler({
  sheetName: 'DLA Chair Nominations',
  fields: [
    { name: 'name', required: true, maxLength: 120 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'designation', required: true, maxLength: 80 },
  ],
  uniqueFields: [
    { name: 'phone', message: 'This contact number has already been used for a DLA Chair nomination.' },
  ],
})
