import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────────
   INJECTED CSS — keyframes only; UI classes replaced by Tailwind
───────────────────────────────────────────────────────────── */
const HOME_CSS = `
  @keyframes sliderFadeIn { from{opacity:0;transform:scale(1.03);} to{opacity:1;transform:scale(1);} }
  @keyframes roundelSpin  { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  @keyframes trailDraw    { from{stroke-dashoffset:600;opacity:0;} 10%{opacity:.65;} to{stroke-dashoffset:0;opacity:.28;} }

  @keyframes reticleCW  { from{transform:rotate(0deg);}  to{transform:rotate(360deg);}  }
  @keyframes reticleCCW { from{transform:rotate(0deg);}  to{transform:rotate(-360deg);} }
  @keyframes reticlePing{ 0%{transform:scale(.9);opacity:1;} 100%{transform:scale(2.1);opacity:0;} }

  .home-trail-1 { stroke-dasharray:600; animation:trailDraw 2.8s ease-out forwards; }
  .home-trail-2 { stroke-dasharray:600; animation:trailDraw 2.8s ease-out .5s forwards; opacity:0; }
  .home-trail-3 { stroke-dasharray:600; animation:trailDraw 2.8s ease-out .9s forwards; opacity:0; }

  @keyframes sideJetFlyUp {
    0%   { transform:translateY(110vh); opacity:0; }
    4%   { opacity:1; }
    88%  { opacity:1; }
    100% { transform:translateY(-25vh); opacity:0; }
  }
  @keyframes afterburnPulse {
    0%,100% { transform:scaleY(1) scaleX(1); opacity:.65; }
    50%      { transform:scaleY(1.6) scaleX(.85); opacity:1; }
  }
  .sj-a { animation: sideJetFlyUp 7s cubic-bezier(.25,.1,.35,1) 0s   infinite; }
  .sj-b { animation: sideJetFlyUp 7s cubic-bezier(.25,.1,.35,1) 3.5s infinite; }
  .sj-c { animation: sideJetFlyUp 8s cubic-bezier(.25,.1,.35,1) 1.2s infinite; }
  .sj-d { animation: sideJetFlyUp 8s cubic-bezier(.25,.1,.35,1) 5s   infinite; }
  .ab   { animation: afterburnPulse .14s ease-in-out infinite; transform-origin: top center; }
`

/* ─────────────────────────────────────────────────────────────
   FIGHTER JET SVG (top-down, nose pointing UP)
───────────────────────────────────────────────────────────── */
function Jet({ id, flipped = false }) {
  const gId = `jg-${id}`
  const cId = `jc-${id}`
  const fId = `jf-${id}`
  const bId = `jb-${id}`
  return (
    <svg viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', transform: flipped ? 'scaleX(-1)' : 'none', filter: 'drop-shadow(0 0 6px rgba(255,107,26,.5))' }}>
      <defs>
        <radialGradient id={gId} cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="22%" stopColor="#ffcc44" stopOpacity=".95" />
          <stop offset="55%" stopColor="#ff4400" stopOpacity=".5" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a5060" />
          <stop offset="48%" stopColor="#9fb8cc" />
          <stop offset="100%" stopColor="#3a5060" />
        </linearGradient>
        <radialGradient id={cId} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c0f8ff" stopOpacity=".95" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity=".5" />
        </radialGradient>
        <filter id={bId}><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <ellipse cx="50" cy="204" rx="16" ry="38" fill={`url(#${gId})`} filter={`url(#${bId})`} opacity=".7" />
      <path d="M50 7 C53 24 55 55 54 116 L50 198 L46 116 C45 55 47 24 50 7Z" fill={`url(#${fId})`} />
      <path d="M46 68 L3 150 L9 158 L44 122 Z" fill="#7a9aaa" opacity=".88" />
      <path d="M54 68 L97 150 L91 158 L56 122 Z" fill="#7a9aaa" opacity=".88" />
      <path d="M47 43 L22 67 L24 73 L46 57 Z" fill="#7a9aaa" opacity=".92" />
      <path d="M53 43 L78 67 L76 73 L54 57 Z" fill="#7a9aaa" opacity=".92" />
      <path d="M47 154 L36 187 L41 185 L48 162 Z" fill="#7a9aaa" opacity=".9" />
      <path d="M53 154 L64 187 L59 185 L52 162 Z" fill="#7a9aaa" opacity=".9" />
      <ellipse cx="50" cy="27" rx="4.5" ry="10" fill={`url(#${cId})`} />
      <ellipse cx="50" cy="25" rx="2" ry="5" fill="#d8f8ff" opacity=".65" />
      <line x1="12" y1="128" x2="36" y2="118" stroke="#FF9933" strokeWidth="2" opacity=".7" />
      <line x1="10" y1="135" x2="34" y2="125" stroke="#ffffff" strokeWidth="1" opacity=".5" />
      <rect x="6" y="132" width="6" height="22" rx="3" fill="#ff6b1a" opacity=".9" />
      <rect x="88" y="132" width="6" height="22" rx="3" fill="#ff6b1a" opacity=".9" />
      <polygon points="9,132 6,122 12,122" fill="#ffcc44" opacity=".85" />
      <polygon points="91,132 88,122 94,122" fill="#ffcc44" opacity=".85" />
      <ellipse cx="50" cy="200" rx="10" ry="28" fill={`url(#${gId})`} />
      <ellipse cx="50" cy="197" rx="5" ry="13" fill="#fffde8" opacity=".8" />
      <ellipse cx="50" cy="195" rx="2" ry="6" fill="#fff" opacity=".95" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SIDE JETS (fixed, both edges of viewport)
───────────────────────────────────────────────────────────── */
function SideJets() {
  const Trail = ({ w = 3, h = 55, delay = 0 }) => (
    <div className="ab" style={{
      position: 'absolute', bottom: -h * .6, left: '50%', transform: 'translateX(-50%)',
      width: w, height: h,
      background: `linear-gradient(to bottom,#fff 0%,#ffcc44 18%,#ff6b1a 45%,#ff2200 75%,transparent 100%)`,
      borderRadius: w / 2, filter: `blur(${w * .9}px)`,
      animationDelay: `${delay}s`,
    }} />
  )

  return (
    <div>
      <div style={{ position: 'fixed', left: 6, top: 0, bottom: 0, width: 52, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="sj-a" style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 118 }}>
          <Jet id="la" /><Trail w={4} h={62} delay={0} />
        </div>
        <div className="sj-b" style={{ position: 'absolute', bottom: 0, left: 6, width: 34, height: 84 }}>
          <Jet id="lb" /><Trail w={2.5} h={44} delay={.06} />
        </div>
      </div>
      <div style={{ position: 'fixed', right: 6, top: 0, bottom: 0, width: 52, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="sj-c" style={{ position: 'absolute', bottom: 0, right: 0, width: 48, height: 118 }}>
          <Jet id="rc" flipped /><Trail w={4} h={62} delay={0} />
        </div>
        <div className="sj-d" style={{ position: 'absolute', bottom: 0, right: 6, width: 34, height: 84 }}>
          <Jet id="rd" flipped /><Trail w={2.5} h={44} delay={.06} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   IAF ROUNDEL
───────────────────────────────────────────────────────────── */
function Roundel({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="49" fill="#138808" />
      <circle cx="50" cy="50" r="37" fill="#ffffff" />
      <circle cx="50" cy="50" r="25" fill="#FF9933" />
      <circle cx="50" cy="50" r="12" fill="#000080" />
      <circle cx="50" cy="50" r="3.5" fill="#ffffff" opacity=".85" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   HUD RETICLE
───────────────────────────────────────────────────────────── */
function HUDReticle({ size = 210 }) {
  const c = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={c} cy={c} r={c - 4} stroke="rgba(255,255,255,.25)" strokeWidth="1" strokeDasharray="7 6" />
      <circle cx={c} cy={c} r={c - 16} stroke="rgba(255,107,26,.5)" strokeWidth="1.5" strokeDasharray="36 18"
        style={{ animation: 'reticleCW 7s linear infinite', transformOrigin: `${c}px ${c}px` }} />
      <circle cx={c} cy={c} r={c - 32} stroke="rgba(212,19,103,.5)" strokeWidth="1.5" strokeDasharray="18 10"
        style={{ animation: 'reticleCCW 5s linear infinite', transformOrigin: `${c}px ${c}px` }} />
      <circle cx={c} cy={c} r={c - 50} stroke="rgba(255,255,255,.45)" strokeWidth="1" />
      <line x1={c} y1={6} x2={c} y2={c - 44} stroke="rgba(255,255,255,.38)" strokeWidth="1" />
      <line x1={c} y1={c + 44} x2={c} y2={size - 6} stroke="rgba(255,255,255,.38)" strokeWidth="1" />
      <line x1={6} y1={c} x2={c - 44} y2={c} stroke="rgba(255,255,255,.38)" strokeWidth="1" />
      <line x1={c + 44} y1={c} x2={size - 6} y2={c} stroke="rgba(255,255,255,.38)" strokeWidth="1" />
      {[[32, 32], [size - 32, 32], [32, size - 32], [size - 32, size - 32]].map(([x, y], i) => {
        const dx = x < c ? 12 : -12, dy = y < c ? 12 : -12
        return <g key={i}><line x1={x} y1={y} x2={x + dx} y2={y} stroke="rgba(255,107,26,.7)" strokeWidth="1.8" /><line x1={x} y1={y} x2={x} y2={y + dy} stroke="rgba(255,107,26,.7)" strokeWidth="1.8" /></g>
      })}
      <circle cx={c} cy={c} r={c - 50} stroke="rgba(255,107,26,.5)" strokeWidth="2"
        style={{ animation: 'reticlePing 2.2s ease-out infinite', transformOrigin: `${c}px ${c}px` }} />
      <circle cx={c} cy={c} r={5} fill="rgba(255,107,26,.8)" />
      <circle cx={c} cy={c} r={2} fill="#fff" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SLIDES = [
  { tag: 'ROTARACT DISTRICT 3191 · 2026–27', title: 'SOAR ABOVE.', titleAccent: 'SERVE BEYOND.', sub: 'Empowering communities through innovative service projects and dynamic youth engagement.' },
  { tag: 'LEADERSHIP · SERVICE · FELLOWSHIP', title: 'LEAD WITH', titleAccent: 'PURPOSE.', sub: 'Join 50+ clubs and 2,000+ Rotaractors on a mission that creates lasting impact.' },
  { tag: 'DISTRICT EVENTS · 2026–27', title: 'FLY HIGH.', titleAccent: 'GIVE BACK.', sub: 'From the District Learning Assembly to Vaayu — our flagship events bring the district together.' },
]

const QUICK_LINKS = [
  { icon: '🚀', title: '3191 Showcase', href: 'https://showcase.rotaract3191.org/', desc: 'Your go-to platform for reporting and displaying your club’s projects. Highlight initiatives, share impact and connect.', tag: 'EXTERNAL', internal: false },
  { icon: '📋', title: 'Forms & Links', href: 'https://go.rotaract3191.org/links', desc: 'Access essential forms and links for seamless club operations — RIDE applications, event registrations, all in one place.', tag: 'RESOURCES', internal: false },
  { icon: '🎨', title: 'Brand Center', href: '/brand-center', desc: 'Resources and guidelines to maintain consistent branding across all platforms for a unified and professional image.', tag: 'INTERNAL', internal: true },
]

const EVENTS = [
  { name: 'District Learning Assembly', slug: 'district-learning-assembly', abbr: 'DLA', icon: '📚', desc: 'The flagship learning event bringing Rotaractors together for workshops and knowledge-sharing.', color: '#38bdf8' },
  { name: 'Nadda Habba', slug: 'nadda-habba', abbr: 'NH', icon: '🎉', desc: 'A cultural celebration uniting clubs in a spirit of fellowship, music and tradition.', color: '#fb923c' },
  { name: 'Vaayu – 4th Annual District Conference', slug: 'vaayu-district-conference', abbr: 'VAAYU', icon: '✈', desc: 'The premier district conference bringing leaders, sponsors and members together — an unmissable milestone.', color: '#fb923c' },
]

const TEAM = [
  { name: 'Rtn. Rtr. Anirudh Kulkarni', role: 'District Rotaract Representative', photo: '/assets/team/2026-27/core-team/Karthik U Chikmath.jpeg' },
  { name: 'Rtn. Rtr. Karthik Chikmath', role: 'Immediate Past DRR', photo: '/assets/team/2026-27/core-team/Karthik U Chikmath.jpeg' },
  { name: 'Rtn. Rtr. Rohan A', role: 'District Rotaract Representative Elect', photo: '/assets/team/2026-27/core-team/Rohan A.JPG' },
  { name: 'PP. Rtr. Girish AR', role: 'General Secretary', photo: '/assets/team/2026-27/core-team/Girish A R.jpeg' },
  { name: 'PP. Rtr. Soumi Bhattacharyya', role: 'District Rotaract Secretary - Admin', photo: '/assets/team/2026-27/core-team/Soumi Bhattacharyya.jpeg' },
  { name: 'PP. Rtr. Padma Nesar R', role: 'District Rotaract Secretary - Operations', photo: '/assets/team/2026-27/core-team/Padma Nesar R.jpg' },
  { name: 'PP. Rtr. Ram M Narayanan', role: 'District Rotaract Secretary - Initiatives', photo: '/assets/team/2026-27/core-team/Ram M Narayanan.jpeg' },
]

const SPONSORS = [
  { name: 'Rotary International', abbr: 'RI' },
  { name: 'Title Sponsor A', abbr: 'TS–A' },
  { name: 'Title Sponsor B', abbr: 'TS–B' },
  { name: 'Gold Sponsor', abbr: 'GOLD' },
  { name: 'Silver Sponsor', abbr: 'SILVER' },
  { name: 'Associate Sponsor', abbr: 'ASSOC' },
]

/* ─────────────────────────────────────────────────────────────
   HERO SLIDER
───────────────────────────────────────────────────────────── */
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const total = SLIDES.length
  const goTo = (i) => setCurrent(i)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

      <section style={{ position: 'relative', minHeight: 'clamp(300px,65vh,550px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {/* Photo background */}
        <div key={current} style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          animation: 'sliderFadeIn .9s ease forwards',
        }} />

        {/* Bottom vignette */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(15,23,42,.82) 0%, transparent 45%)' }} />

        {/* Missile trails */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="home-trail-1" d="M0,80 Q30,50 75,15" stroke="rgba(56,189,248,.6)" strokeWidth=".45" fill="none" />
          <path className="home-trail-2" d="M5,90 Q40,60 85,10" stroke="rgba(255,107,26,.5)" strokeWidth=".38" fill="none" />
          <path className="home-trail-3" d="M0,100 Q60,55 100,20" stroke="rgba(212,19,103,.4)" strokeWidth=".32" fill="none" />
        </svg>

        {/* Roundel watermark */}
        <div style={{ position: 'absolute', top: '5%', right: '-5%', zIndex: 2, width: 'clamp(160px,34vw,300px)', height: 'clamp(160px,34vw,300px)', opacity: .06, animation: 'roundelSpin 22s linear infinite', pointerEvents: 'none' }}>
          <Roundel size="100%" />
        </div>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 4 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: 8,
                width: current === i ? 24 : 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background: current === i ? '#d41367' : 'rgba(255,255,255,.4)',
                transition: 'width .32s ease, background .32s ease',
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        {[
          ['hero-prev', '‹', { left: 14 }, () => setCurrent(c => (c - 1 + total) % total)],
          ['hero-next', '›', { right: 14 }, () => setCurrent(c => (c + 1) % total)],
        ].map(([id, ch, pos, fn]) => (
          <button key={id} onClick={fn} id={id} aria-label={id}
            style={{ position: 'absolute', ...pos, top: '50%', transform: 'translateY(-50%)', zIndex: 4, background: 'rgba(15,23,42,.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.2)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: 22 }}>
            {ch}
          </button>
        ))}
      </section>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const styleRef = useRef(null)

  useEffect(() => {
    if (document.getElementById('home-css-v4')) return
    const el = document.createElement('style')
    el.id = 'home-css-v4'
    el.textContent = HOME_CSS
    document.head.appendChild(el)
    styleRef.current = el
    return () => { if (styleRef.current) styleRef.current.remove() }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8 flex flex-col gap-5">

      <SideJets />

      {/* ══ §1 HERO ══ */}
      <HeroSlider />

      {/* ══ §2 QUICK LINKS ══ */}
      <section id="quick-links" className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h2 className="font-black text-slate-900">Quick Links</h2>
            <p className="text-xs tracking-[0.25em] text-slate-500">FLIGHT CONTROLS</p>
          </div>
          <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-xs font-bold text-[#d41367]">
            {QUICK_LINKS.length} LINKS
          </div>
        </div>

        <div className="p-5 grid gap-5 md:grid-cols-3">
          {QUICK_LINKS.map((ql, i) => {
            const Wrap = ql.internal ? Link : 'a'
            const props = ql.internal
              ? { to: ql.href, id: `ql-${i}` }
              : { href: ql.href, target: '_blank', rel: 'noreferrer', id: `ql-${i}` }
            return (
              <Wrap key={i} {...props}
                className="group relative overflow-hidden flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367] hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
                style={{ textDecoration: 'none' }}
              >
                <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#d41367] via-[#ff8fb0] to-slate-900" />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{ql.tag}</p>
                  <span className="text-lg">{ql.icon}</span>
                </div>
                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{ql.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{ql.desc}</p>
              </Wrap>
            )
          })}
        </div>
      </section>

      {/* ══ §3 ABOUT US ══ */}
      <section id="about" className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(32px,5vw,60px)', padding: 'clamp(36px,6vw,64px) clamp(20px,5vw,52px)' }}>
          {/* HUDReticle — kept intact on left */}
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', width: 'clamp(160px,30vw,210px)', margin: '0 auto' }}>
            <HUDReticle size={205} />
          </div>

          {/* Right content */}
          <div style={{ flex: '1 1 280px' }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">ABOUT US</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              About Rotaract<br />District 3191
            </h2>
            <div className="mt-3 h-[3px] w-11 rounded-full bg-[#d41367]" />

            <p className="mt-4 text-base leading-8 text-slate-600">
              Rotaract District 3191 is dedicated to fostering leadership and community service among young professionals and students. We focus on impactful projects that address local and global issues, creating positive change in our communities.
            </p>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Our district supports diverse initiatives promoting personal development, professional growth and community engagement across Bangalore, Ramanagara, Kolar and Chittor.
            </p>

            <div className="mt-4 space-y-2">
              {['50+ active Rotaract clubs across the district', '2,000+ young leaders united in service', '100+ community projects completed'].map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#d41367]" />
                  <p className="text-sm leading-7 text-slate-600">{t}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              id="about-cta"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d41367] px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_24px_rgba(212,19,103,0.22)] transition-all duration-300 hover:bg-[#b71258] hover:shadow-[0_0_25px_rgba(212,19,103,0.35)]"
              style={{ textDecoration: 'none' }}
            >
              KNOW MORE →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ §4 EVENTS ══ */}
      <section id="events" className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <h2 className="font-black text-slate-900">District Events</h2>
            <p className="text-xs tracking-[0.25em] text-slate-500">MISSION CALENDAR</p>
          </div>
          <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-xs font-bold text-[#d41367]">
            {EVENTS.length} EVENTS
          </div>
        </div>

        <div className="p-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <Link
              to={`/events/${ev.slug}`}
              key={i}
              id={`event-${i}`}
              className="group relative overflow-hidden flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367] hover:shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              style={{ textDecoration: 'none' }}
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#d41367] via-[#ff8fb0] to-slate-900" />
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{ev.abbr}</p>
                <span className="text-lg">{ev.icon}</span>
              </div>
              <h3 className="mt-3 text-xl font-black tracking-tight text-slate-900">{ev.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{ev.desc}</p>
            </Link>
          ))}
        </div>

        <div className="border-t border-slate-200 p-5 flex justify-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            style={{ textDecoration: 'none' }}
          >
            View All Events →
          </Link>
        </div>
      </section>

      {/* ══ §5 TEAM ══ */}
      <section id="team-preview" className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        {/* Roundel watermark — kept intact */}
        <div style={{ position: 'absolute', top: '50%', right: '-6%', transform: 'translateY(-50%)', width: 'clamp(180px,36vw,300px)', height: 'clamp(180px,36vw,300px)', opacity: .05, animation: 'roundelSpin 22s linear infinite', pointerEvents: 'none' }}>
          <Roundel size="100%" />
        </div>

        <div className="relative flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">DISTRICT COMMAND CENTER</p>
            <h2 className="font-black text-slate-900">Meet The Team</h2>
          </div>
          <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-xs font-bold text-[#d41367]">
            {TEAM.length} MEMBERS
          </div>
        </div>

        <div className="relative p-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {TEAM.map((m, i) => (
            <div key={i} id={`tm-${i}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367]">
              <div className="aspect-square overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]">
                <img
                  src={m.photo}
                  alt={m.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
              <div className="p-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">PERSONNEL</p>
                <h4 className="mt-1 text-sm font-black text-slate-900 leading-tight">{m.name}</h4>
                <p className="mt-1 text-xs leading-5 text-slate-600">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative border-t border-slate-200 p-5 flex justify-center">
          <Link
            to="/team"
            id="team-cta"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            style={{ textDecoration: 'none' }}
          >
            🎖&nbsp;Know the Full Team
          </Link>
        </div>
      </section>

      {/* ══ §6 SPONSORS ══ */}
      <section id="sponsors" className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 py-4">
          <span className="mr-3 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <div>
            <h2 className="font-black text-slate-900">Year-Long Sponsors</h2>
            <p className="text-xs tracking-[0.25em] text-slate-500">OUR YEAR LONG · ALLIED PARTNERS</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-4">
            {SPONSORS.map((sp, i) => (
              <div key={i} id={`sp-${i}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center min-w-28 transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367]"
              >
                <div className="text-lg font-black tracking-wide text-slate-900">{sp.abbr}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{sp.name}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-slate-500">
            Interested in partnering? Contact us at the district office.
          </p>
        </div>
      </section>

    </div>
  )
}
