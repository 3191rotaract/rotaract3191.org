import { lazy, Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
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
const Documents = lazy(() => import('./pages/Documents.jsx'))
const Profiles = lazy(() => import('./pages/Profiles.jsx'))
const QuickLinks = lazy(() => import('./pages/QuickLinks.jsx'))

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutRotaract />} />
              <Route path="about-3191" element={<AboutRotaract3191 />} />
              <Route path="newsletters" element={<Newsletters />} />
              <Route path="resources" element={<BrandCenter />} />
              <Route path="resources/logos" element={<Logos />} />
              <Route path="resources/documents" element={<Documents />} />
              <Route path="resources/profiles" element={<Profiles />} />
              <Route path="team" element={<Team />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:slug" element={<EventDetails />} />
              <Route path="zones" element={<Zones />} />
              <Route path="quick-links" element={<QuickLinks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
