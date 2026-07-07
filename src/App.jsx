import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import { CUSTOM_LINKS } from './data/links.js'
import './App.css'

const BrandCenter = lazy(() => import('./pages/BrandCenter.jsx'))
const Newsletters = lazy(() => import('./pages/Newsletters.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const Logos = lazy(() => import('./pages/Logos.jsx'))
const Calendar = lazy(() => import('./pages/Calendar.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const EventDetails = lazy(() => import('./pages/EventDetails.jsx'))
const Zones = lazy(() => import('./pages/Zones.jsx'))
const AboutRotaract = lazy(() => import('./pages/AboutRotaract.jsx'))
const AboutRotaract3191 = lazy(() => import('./pages/AboutRotaract3191.jsx'))
const DrrElect = lazy(() => import('./pages/DrrElect.jsx'))
const Documents = lazy(() => import('./pages/Documents.jsx'))
const Profiles = lazy(() => import('./pages/Profiles.jsx'))
const ProfileDetails = lazy(() => import('./pages/ProfileDetails.jsx'))
const ResourceHub = lazy(() => import('./pages/ResourceHub.jsx'))

function App() {
  const [isHomeLanding] = useState(() => window.location.pathname === '/')
  const [preloaderDone, setPreloaderDone] = useState(false)
  const showPreloader = isHomeLanding && !preloaderDone

  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '')
  const redirectTarget = CUSTOM_LINKS[slug]

  useLayoutEffect(() => {
    if (redirectTarget) {
      window.location.replace(redirectTarget)
    }
  }, [redirectTarget])

  if (redirectTarget) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <img
          src="/assets/brand-centre/2026-27/Rotaract 3191 CLA - Cranberry.png"
          alt="Rotaract District 3191"
          className="h-16 w-auto animate-pulse"
        />
      </div>
    )
  }

  return (
    <>
      {showPreloader && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <div style={{ opacity: showPreloader ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutRotaract />} />
              <Route path="about-3191" element={<AboutRotaract3191 />} />
              <Route path="know-your-drr-elect" element={<DrrElect />} />
              <Route path="newsletters" element={<Newsletters />} />
              <Route path="resources" element={<BrandCenter />} />
              <Route path="resources/logos" element={<Logos />} />
              <Route path="resources/documents" element={<Documents />} />
              <Route path="resources/profiles" element={<Profiles />} />
              <Route path="resources/profiles/:slug" element={<ProfileDetails />} />
              <Route path="team" element={<Team />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:slug" element={<EventDetails />} />
              <Route path="zones" element={<Zones />} />
              <Route path="resource-hub" element={<ResourceHub />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
