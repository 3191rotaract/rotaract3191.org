import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { WINGS_LOG, CLUB_PUBLICATIONS, slugify } from '../data/publications.js'

function resolvePublication(groupId, pubSlug) {
  if (groupId === 'district') {
    const edition = WINGS_LOG.editions.find((e) => slugify(e.name) === pubSlug)
    if (!edition) return null
    return { publication: edition, groupName: WINGS_LOG.name }
  }

  const club = CLUB_PUBLICATIONS.find((c) => c.clubId === groupId)
  if (!club) return null

  const publication = club.publications.find((p) => slugify(p.name) === pubSlug)
  if (!publication) return null

  return { publication, groupName: club.clubName }
}

export default function PublicationViewer() {
  const { groupId, pubSlug } = useParams()
  const resolved = resolvePublication(groupId, pubSlug)

  if (!resolved) return <Navigate to="/publications" replace />

  const { publication, groupName } = resolved

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/publications"
          className="group/back inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-[#d41367] hover:bg-[#d41367] hover:text-white hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)]"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover/back:-translate-x-1" />
          Back to Publications
        </Link>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d41367]">{groupName}</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{publication.name}</h1>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
        <iframe
          src={publication.link}
          title={publication.name}
          className="w-full"
          style={{ height: 'calc(100vh - 260px)', minHeight: '500px' }}
          allow="fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}
