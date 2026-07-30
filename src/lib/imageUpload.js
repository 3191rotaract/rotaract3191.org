// Client-side image prep for forms that upload photos to Google Drive via
// the Apps Script backend. Every photo is downscaled and re-encoded as JPEG
// before being base64'd into the JSON payload — phone camera photos can be
// 5-10MB, and Netlify Functions cap request bodies well under that, so
// re-encoding (not just capping file size) is what keeps submissions
// reliable regardless of the source photo.
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82
export const MAX_SOURCE_BYTES = 20 * 1024 * 1024

export async function fileToUploadPayload(file) {
  const dataUrl = await readFileAsDataUrl(file)
  const image = await loadImage(dataUrl)

  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height))
  const width = Math.round(image.width * scale)
  const height = Math.round(image.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.getContext('2d').drawImage(image, 0, 0, width, height)

  const compressedDataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY)

  return {
    name: file.name,
    mimeType: 'image/jpeg',
    data: compressedDataUrl.split(',')[1],
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read the selected file'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('That file is not a readable image'))
    image.src = src
  })
}
