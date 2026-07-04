import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../data/siteContent.js'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 text-slate-900">
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#fffdf9_0%,#f4efe8_100%)] shadow-[0_18px_48px_rgba(15,23,42,0.12)]">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-3 lg:flex-nowrap">
              <NavLink to="/" end className="flex items-center gap-3 self-start">
                <img src="/assets/brand-centre/2026-27/Rotaract 3191 CLA - Cranberry.png" alt="Rotaract District 3191 Logo" className="h-13.5 w-auto" />
              </NavLink>

              <div className="hidden flex-1 items-center justify-center px-4 lg:flex">
                <nav
                  aria-label="Primary navigation"
                  className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-inner shadow-slate-100"
                >
                  {navItems.map((item) => (
                    item.dropdown ? (
                      <div key={item.label} className="relative group">
                        <button className="rounded-full px-4 py-2 text-sm font-semibold transition duration-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 inline-flex items-center gap-1 cursor-default">
                          {item.label}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                          {item.dropdown.map(subItem => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                `block rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 ${isActive ? 'bg-[#d41367] text-white shadow-[0_10px_24px_rgba(212,19,103,0.24)]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        key={item.path || item.label}
                        to={item.path || '#'}
                        end={item.path === '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          [
                            'rounded-full px-4 py-2 text-sm font-semibold transition duration-200',
                            isActive
                              ? 'bg-[#d41367] text-white shadow-[0_10px_24px_rgba(212,19,103,0.24)]'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                          ].join(' ')
                        }
                      >
                        {item.label}
                      </NavLink>
                    )
                  ))}
                </nav>
              </div>

              <div className="hidden items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 sm:flex">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d41367] sm:inline-block">
                    Ready to take off
                  </span>
              </div>

              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
              >
                <span className="relative flex h-4 w-5 flex-col justify-between">
                  <span className={`h-0.5 w-full rounded-full bg-current transition ${isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
                  <span className={`h-0.5 w-full rounded-full bg-current transition ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full rounded-full bg-current transition ${isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
                </span>
              </button>
            </div>

            <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col gap-3 lg:hidden`}>
              <nav
                aria-label="Primary navigation"
                className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-inner shadow-slate-100 lg:flex-row lg:flex-wrap lg:justify-start"
              >
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.label} className="flex flex-col gap-1 w-full">
                      <div className="rounded-2xl px-3 py-2 text-center text-sm font-semibold text-slate-400 bg-slate-50 uppercase tracking-widest mt-2">{item.label}</div>
                      {item.dropdown.map(subItem => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            [
                              'rounded-2xl px-3 py-2 text-center text-sm font-semibold transition duration-200 lg:rounded-full lg:px-4',
                              isActive
                                ? 'bg-[#d41367] text-white shadow-[0_10px_24px_rgba(212,19,103,0.24)]'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                            ].join(' ')
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    <NavLink
                      key={item.path || item.label}
                      to={item.path || '#'}
                      end={item.path === '/'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        [
                          'rounded-2xl px-3 py-2 text-center text-sm font-semibold transition duration-200 lg:rounded-full lg:px-4',
                          isActive
                            ? 'bg-[#d41367] text-white shadow-[0_10px_24px_rgba(212,19,103,0.24)]'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar