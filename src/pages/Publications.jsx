import { Link } from 'react-router-dom'
import { BookOpen, Newspaper, ArrowRight, Building2 } from 'lucide-react'
import { WINGS_LOG, CLUB_PUBLICATIONS, slugify } from '../data/publications.js'

function PublicationCard({ to, name, image }) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367] hover:shadow-xl"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <BookOpen size={40} />
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-black leading-tight text-slate-900">{name}</h3>

        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d41367]/30 bg-[#d41367]/5 px-3 py-1.5 text-xs font-semibold text-[#d41367] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#d41367] group-hover:bg-[#d41367] group-hover:text-white group-hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)]">
            Read
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function EmptyState({ text }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm font-semibold text-slate-400">
      {text}
    </div>
  )
}

export default function Publications() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
            <Newspaper size={14} />
            <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">PUBLICATIONS</span>
          </div>

          <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Publications
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Discover and read digital editions from across District 3191 — the district's own Wings Log, and
            publications from clubs.
          </p>
        </div>
      </section>

      {/* WINGS LOG */}
      <div className="mt-10 flex items-center gap-3">
        {WINGS_LOG.logo && (
          <img src={WINGS_LOG.logo} alt={`${WINGS_LOG.name} logo`} className="h-10 w-10 rounded-xl object-contain" />
        )}
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{WINGS_LOG.name}</h2>
        <span className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d41367]">
          {WINGS_LOG.frequency}
        </span>
      </div>

      <div className="mt-4">
        {WINGS_LOG.editions.length === 0 ? (
          <EmptyState text="No editions published yet — check back soon." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {WINGS_LOG.editions.map((edition) => (
              <PublicationCard
                key={edition.name}
                to={`/publications/district/${slugify(edition.name)}`}
                name={edition.name}
                image={edition.image}
              />
            ))}
          </div>
        )}
      </div>

      {/* CLUB PUBLICATIONS */}
      <h2 className="mt-14 text-2xl font-black tracking-tight text-slate-900">Club Publications</h2>

      <div className="mt-4 space-y-10">
        {CLUB_PUBLICATIONS.length === 0 ? (
          <EmptyState text="No club publications published yet — check back soon." />
        ) : (
          CLUB_PUBLICATIONS.map((club) => (
            <div key={club.clubId}>
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-[#d41367]" />
                <h3 className="text-lg font-bold text-slate-800">{club.clubName}</h3>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {club.publications.map((pub) => (
                  <PublicationCard
                    key={pub.name}
                    to={`/publications/${club.clubId}/${slugify(pub.name)}`}
                    name={pub.name}
                    image={pub.image}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
