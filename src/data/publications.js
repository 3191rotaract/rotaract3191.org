// Slugifies a name for use in a publication route, e.g. "August 2026" -> "august-2026".
export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// The district's monthly publication. Displayed first on the Publications page.
// `logo` is left blank until the Wings Log logo is shared — add its path once available.
export const WINGS_LOG = {
  name: 'The Wings Log',
  frequency: 'Monthly',
  logo: '',
  editions: [
    // { name: 'August 2026', link: '', image: '' },
  ],
}

// Each club's publications. `clubId` is used in the publication route
// (/publications/<clubId>/<publication-name-slug>), so keep it URL-safe.
export const CLUB_PUBLICATIONS = [
  // {
  //   clubId: 'koramangala',
  //   clubName: 'Rotaract Club of Koramangala',
  //   publications: [
  //     { name: 'Edition 1', link: '', image: '' },
  //   ],
  // },
]
