import { useEffect, useRef, useState } from 'react'

/* ─── Keyframe CSS injected into <head> ─── */
const PRELOADER_CSS = `
  @keyframes pl-jet1 {
    0%   { transform: translateY(110vh); opacity: 0; }
    4%   { opacity: 1; }
    88%  { opacity: 1; }
    100% { transform: translateY(-20vh); opacity: 0; }
  }
  @keyframes pl-jet2 {
    0%   { transform: translateY(115vh); opacity: 0; }
    6%   { opacity: 1; }
    88%  { opacity: 1; }
    100% { transform: translateY(-20vh); opacity: 0; }
  }
  @keyframes pl-jet3 {
    0%   { transform: translateY(112vh); opacity: 0; }
    8%   { opacity: 1; }
    88%  { opacity: 1; }
    100% { transform: translateY(-20vh); opacity: 0; }
  }
  @keyframes pl-afterburn {
    0%, 100% { transform: scaleY(1) scaleX(1); opacity: 0.65; }
    50%       { transform: scaleY(1.6) scaleX(0.85); opacity: 1; }
  }
  @keyframes pl-gridPulse {
    0%, 100% { opacity: 0.06; }
    50%       { opacity: 0.13; }
  }
  @keyframes pl-titleReveal {
    0%   { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0% 0 0); }
  }
  @keyframes pl-subtitleFade {
    0%   { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes pl-roundelIn {
    0%   { transform: scale(0) rotate(-240deg); opacity: 0; }
    60%  { transform: scale(1.15) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes pl-scanLine {
    0%   { top: -4px; opacity: 1; }
    100% { top: calc(100% + 4px); opacity: 0.3; }
  }
  @keyframes pl-fadeOut {
    0%   { opacity: 1; }
    100% { opacity: 0; pointer-events: none; }
  }
  @keyframes pl-fadeIn {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes pl-radarPing {
    0%   { r: 6; opacity: 1; }
    100% { r: 48; opacity: 0; }
  }
  .pl-jet1 { animation: pl-jet1 2.2s cubic-bezier(0.2, 0.1, 0.35, 1) forwards; }
  .pl-jet2 { animation: pl-jet2 2.1s cubic-bezier(0.2, 0.1, 0.35, 1) 0.32s forwards; }
  .pl-jet3 { animation: pl-jet3 2.2s cubic-bezier(0.2, 0.1, 0.35, 1) 0.6s forwards; }
  .pl-grid  { animation: pl-gridPulse 2s ease-in-out infinite; }
  .pl-title { animation: pl-titleReveal 1.1s cubic-bezier(0.4,0,0.2,1) forwards; }
  .pl-subtitle { animation: pl-subtitleFade 0.9s ease-out 0.6s forwards; opacity: 0; }
  .pl-roundel  { animation: pl-roundelIn 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .pl-exit  { animation: pl-fadeOut 0.55s ease-in forwards; }
  .pl-enter { animation: pl-fadeIn 0.4s ease-out forwards; }
`

/* ─── Fighter jet SVG (top-down view, nose pointing UP) ─── */
function FighterJet({ id, scale = 1 }) {
  const gId = `plg-${id}`
  const cId = `plc-${id}`
  const fId = `plf-${id}`
  return (
    <svg
      viewBox="0 0 100 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        {/* Afterburner glow */}
        <radialGradient id={gId} cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
          <stop offset="20%"  stopColor="#ffaa00" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#ff3300" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>
        {/* Cockpit glow */}
        <radialGradient id={cId} cx="50%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#b0f0ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00c8ff" stopOpacity="0.5" />
        </radialGradient>
        {/* Jet body metallic */}
        <linearGradient id={fId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6e8499" />
          <stop offset="50%"  stopColor="#c0ccd8" />
          <stop offset="100%" stopColor="#6e8499" />
        </linearGradient>
        <filter id={`plBlur-${id}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Engine exhaust blur halo (behind) */}
      <ellipse cx="50" cy="205" rx="16" ry="36" fill={`url(#${gId})`} filter={`url(#plBlur-${id})`} opacity="0.7" />

      {/* ── Fuselage ── */}
      <path d="M50 7 C53 24 55 55 54 115 L50 198 L46 115 C45 55 47 24 50 7Z" fill={`url(#${fId})`} />

      {/* ── Left main delta wing ── */}
      <path d="M46 68 L3 148 L9 157 L44 122 Z" fill="#8898aa" opacity="0.88" />
      {/* ── Right main delta wing ── */}
      <path d="M54 68 L97 148 L91 157 L56 122 Z" fill="#8898aa" opacity="0.88" />

      {/* ── Left canard ── */}
      <path d="M47 42 L21 66 L23 72 L46 56 Z" fill="#8898aa" opacity="0.92" />
      {/* ── Right canard ── */}
      <path d="M53 42 L79 66 L77 72 L54 56 Z" fill="#8898aa" opacity="0.92" />

      {/* ── Left tail fin ── */}
      <path d="M47 153 L36 186 L41 184 L48 162 Z" fill="#8898aa" opacity="0.9" />
      {/* ── Right tail fin ── */}
      <path d="M53 153 L64 186 L59 184 L52 162 Z" fill="#8898aa" opacity="0.9" />

      {/* ── Cockpit canopy ── */}
      <ellipse cx="50" cy="27" rx="4.5" ry="10" fill={`url(#${cId})`} />
      <ellipse cx="50" cy="25" rx="2"   ry="5"  fill="#d8f8ff" opacity="0.65" />

      {/* ── Missiles under wings ── */}
      <rect x="6"  y="134" width="5" height="20" rx="2.5" fill="#ff6b1a" opacity="0.9" />
      <rect x="89" y="134" width="5" height="20" rx="2.5" fill="#ff6b1a" opacity="0.9" />

      {/* ── Afterburner flame (front/bright) ── */}
      <ellipse cx="50" cy="201" rx="9"  ry="25" fill={`url(#${gId})`} />
      <ellipse cx="50" cy="198" rx="4"  ry="11" fill="#fffde8" opacity="0.85" />
      <ellipse cx="50" cy="196" rx="1.8" ry="5" fill="#ffffff" opacity="0.95" />
    </svg>
  )
}


/* ─── Preloader component ─── */
export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('jets')   // 'jets' | 'text' | 'exit'
  const styleEl = useRef(null)

  useEffect(() => {
    /* Inject keyframe styles */
    const el = document.createElement('style')
    el.textContent = PRELOADER_CSS
    document.head.appendChild(el)
    styleEl.current = el

    /* Timeline */
    const t1 = setTimeout(() => setPhase('text'), 2200)
    const t2 = setTimeout(() => setPhase('exit'), 3600)
    const t3 = setTimeout(() => onComplete(),     4150)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      if (styleEl.current) document.head.removeChild(styleEl.current)
    }
  }, [onComplete])

  /* ── Afterburner trail element ── */
  const Trail = ({ width = 4, height = 70, delay = 0 }) => (
    <div style={{
      position: 'absolute',
      bottom: -height * 0.6,
      left: '50%',
      transform: 'translateX(-50%)',
      width,
      height,
      background: `linear-gradient(to bottom,
        #fff 0%,
        #ffcc44 15%,
        #ff6b1a 40%,
        #ff2200 70%,
        transparent 100%)`,
      borderRadius: width / 2,
      filter: `blur(${width * 0.8}px)`,
      animation: `pl-afterburn 0.13s ease-in-out ${delay}s infinite`,
      transformOrigin: 'top center',
    }} />
  )

  return (
    <div
      className={phase === 'exit' ? 'pl-exit' : ''}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0e1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Tactical grid background ── */}
      <div className="pl-grid" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,200,255,0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.12) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }} />

      {/* Subtle scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,0.025) 3px,rgba(0,200,255,0.025) 4px)',
      }} />

      {/* ── Horizon glow line ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.35),transparent)',
        boxShadow: '0 0 20px rgba(0,200,255,0.2)',
      }} />

      {/* ── JETS PHASE ── */}
      {phase === 'jets' && (
        <>
          {/* ── Left jet ── */}
          <div className="pl-jet1" style={{
            position: 'absolute', left: '22%', bottom: 0,
            width: 46, height: 115, marginLeft: -23,
          }}>
            <FighterJet id="a" />
            <Trail width={3} height={60} delay={0} />
          </div>

          {/* ── Centre jet (larger, leads) ── */}
          <div className="pl-jet2" style={{
            position: 'absolute', left: '50%', bottom: 0,
            width: 62, height: 155, marginLeft: -31,
          }}>
            <FighterJet id="b" />
            <Trail width={5} height={90} delay={0.04} />
          </div>

          {/* ── Right jet ── */}
          <div className="pl-jet3" style={{
            position: 'absolute', left: '76%', bottom: 0,
            width: 46, height: 115, marginLeft: -23,
          }}>
            <FighterJet id="c" />
            <Trail width={3} height={60} delay={0.07} />
          </div>
        </>
      )}

      {/* ── TEXT PHASE ── */}
      {phase === 'text' && (
        <div className="pl-enter" style={{ textAlign: 'center', position: 'relative', padding: '0 24px' }}>
          {/* Rotaract Mark of Excellence spin-in */}
          <div className="pl-roundel" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <img
              src="/assets/brand-centre/2026-27/Rotaract Mark of Excellence.png"
              alt="Rotaract Mark of Excellence"
              width={68}
              height={68}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Title reveal with clip-path wipe */}
          <div style={{ overflow: 'hidden', marginBottom: 6 }}>
            <h1
              className="pl-title"
              style={{
                fontFamily: "'Rajdhani', 'Inter', sans-serif",
                fontSize: 'clamp(1rem, 5.5vw, 2rem)',
                fontWeight: 700,
                color: '#e8edf5',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              ROTARACT DISTRICT 3191
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="pl-subtitle"
            style={{
              fontFamily: "'Rajdhani', 'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#00c8ff',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            SOAR ABOVE &nbsp;·&nbsp; SERVE BEYOND
          </p>

          {/* Scan-line sweep over text */}
          <div style={{
            position: 'absolute', inset: '-8px -28px',
            overflow: 'hidden', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg,transparent,rgba(0,200,255,0.9),transparent)',
              boxShadow: '0 0 14px rgba(0,200,255,0.8)',
              animation: 'pl-scanLine 1.3s linear forwards',
            }} />
          </div>
        </div>
      )}
    </div>
  )
}
