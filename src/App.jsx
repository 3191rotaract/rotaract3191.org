import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import BrandCenter from './pages/BrandCenter.jsx'
import Home from './pages/Home.jsx'
import Newsletters from './pages/Newsletters.jsx'
import NotFound from './pages/NotFound.jsx'
import Team from './pages/Team.jsx'
import Logos from './pages/Logos.jsx'
import Calendar from './pages/Calendar.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Zones from './pages/Zones.jsx'
import './App.css'
import AboutRotaract from './pages/AboutRotaract.jsx'
import AboutRotaract3191 from './pages/AboutRotaract3191.jsx'
import Documents from './pages/Documents.jsx'
import Profiles from './pages/Profiles.jsx'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutRotaract />} />
            <Route path="about-3191" element={<AboutRotaract3191 />} />
            <Route path="newsletters" element={<Newsletters />} />
            <Route path="brand-center" element={<BrandCenter />} />
            <Route path="brand-center/logos" element={<Logos />} />
            <Route path="brand-center/documents" element={<Documents />} />
            <Route path="brand-center/profiles" element={<Profiles />} />
            <Route path="team" element={<Team />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:slug" element={<EventDetails />} />
            <Route path="zones" element={<Zones />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
