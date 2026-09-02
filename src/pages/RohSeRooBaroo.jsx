import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Film, Mail, Home as HomeIcon, ArrowUpRight, ArrowLeft } from 'lucide-react'
import { PROFILES } from '../data/profiles.js'

const DRRE = PROFILES.find((profile) => profile.slug === 'drre')

const BOOK_APPOINTMENT_URL = 'https://go.rotaract3191.org/roh-se-roobaroo'

const CONTACT_DETAILS = [
  { label: 'Email', value: 'rotaract3191drr2728@gmail.com', icon: Mail },
  { label: 'Home Club', value: 'Rotaract Club of Bangalore Orchards', icon: HomeIcon },
]

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Contact', href: '#contact' },
  { label: 'About DRRE', href: '#about' },
]

function ContactCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 border border-[#caa568]/30 bg-white/5 px-5 py-4">
      <Icon size={18} className="shrink-0 text-[#caa568]" />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#caa568]/70">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  )
}

export default function RohSeRooBaroo() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="top" className="min-h-screen w-full bg-black text-white">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Yellowtail&family=Playfair+Display:wght@500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <title>Roh Se RooBaroo — DRRE Connect | Rotaract District 3191</title>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[#caa568]/25 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/assets/brand-centre/2026-27/Rotaract 3191 CLA - White.png"
              alt="Rotaract District 3191"
              className="h-11 w-auto sm:h-14"
            />
          </a>

          <nav aria-label="Roh Se RooBaroo navigation" className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-[#caa568]/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#caa568] transition hover:bg-[#caa568] hover:text-black"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#caa568]/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#caa568] transition hover:bg-[#caa568] hover:text-black"
            >
              <ArrowLeft size={12} />
              Back to Main Page
            </Link>
          </nav>
        </div>
      </header>

      {/* PAGE BODY */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#caa568]/25 blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#caa568]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[#caa568]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#caa568]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-[#caa568]/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent 0 90px, rgba(202,165,104,0.6) 90px 91px)',
          }}
        />

        {/* HERO */}
        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:py-20">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/assets/brand-centre/2026-27/event-logos/RohSeRooBaroo.png"
              alt="Roh Se RooBaroo — DRRE Connect, a district driven by you"
              className="w-full max-w-2xl object-contain"
            />
          </div>

          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#caa568]/40 bg-[#caa568]/10 px-4 py-2">
              <Film size={14} className="text-[#caa568]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#caa568]">
                DRRE CONNECT
              </span>
            </div>

            <div className="relative mt-6 border-2 border-[#caa568] p-1">
              <div className="border border-[#caa568]/60 px-6 py-8 text-center sm:px-10">
                <p
                  className="bg-linear-to-r from-white via-white to-white bg-clip-text text-4xl leading-tight text-transparent sm:text-5xl"
                  style={{ fontFamily: "'Yellowtail', cursive" }}
                >
                  Roh Se RooBaroo
                </p>
                <p
                  className="mt-3 text-base text-white/90 sm:text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  A District Driven by You — PP Rtn. Rtr.
                </p>
                <p
                  className="mt-1 text-xl font-bold tracking-wide text-[#caa568] sm:text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ROHAN A
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-7 text-white/80 sm:text-base">
              Every club has a story. Every member has a voice. Roh Se RooBaroo is an opportunity to bring those stories together, celebrate what makes each club unique, and build a district where every Rotaractor feels heard, valued, and inspired to make a difference. <br /><br />
              Connect Now - Let’s begin the conversation!
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#caa568]/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#caa568]" />
              <span className="h-px flex-1 bg-[#caa568]/40" />
            </div>

            <a
              href={BOOK_APPOINTMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 border-2 border-[#caa568] px-8 py-4 text-sm font-bold uppercase tracking-[0.3em] text-[#caa568] transition hover:bg-[#caa568] hover:text-black sm:w-auto"
            >
              Book Appointment
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="relative z-10 mx-auto max-w-7xl scroll-mt-24 border-t border-[#caa568]/20 px-4 py-14 sm:px-6 lg:px-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#caa568]/70">
            About the DRR-Elect
          </p>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
            <img
              src={DRRE.primaryPhoto}
              alt={DRRE.name}
              className="mx-auto h-72 w-56 rounded-sm border border-[#caa568]/40 object-cover lg:mx-0"
            />

            <div className="space-y-4">
              {DRRE.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-white/75">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="relative z-10 mx-auto max-w-7xl scroll-mt-24 border-t border-[#caa568]/20 px-4 py-14 sm:px-6 lg:px-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#caa568]/70">
            Contact Details
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {CONTACT_DETAILS.map((item) => (
              <ContactCard key={item.label} {...item} />
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#caa568]/20 px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#caa568]/60">
          Roh Se RooBaroo · DRRE Connect · Rotaract District 3191
        </p>
      </footer>
    </div>
  )
}
