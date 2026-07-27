import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Images, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { DISTRICT_EVENTS } from '../data/events.js';

export default function EventDetails() {
  const { slug } = useParams();
  const event = DISTRICT_EVENTS.find(e => e.slug === slug);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!event || event.photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % event.photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [event]);

  if (!event) return <Navigate to="/events" replace />;

  const nextSlide = () => setCurrentSlide(p => (p + 1) % event.photos.length);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + event.photos.length) % event.photos.length);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">

      {/* HERO */}
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="p-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#d41367] transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
                <Calendar size={14} />
                <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
                  MISSION BRIEFING
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                {event.title}
              </h1>
              {event.tagline && (
                <p className="mt-3 text-lg font-bold italic tracking-wide text-[#d41367]">
                  "{event.tagline}"
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 lg:flex-nowrap">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center min-w-32">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Type</div>
                <div className="mt-2 text-sm font-black text-slate-900">{event.date}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center min-w-32">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Photos</div>
                <div className="mt-2 text-2xl font-black text-slate-900">{event.photos.length}</div>
              </div>
              {event.partners?.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center min-w-32">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Partners</div>
                  <div className="mt-2 text-2xl font-black text-slate-900">{event.partners.length}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO CAROUSEL */}
      <section className="mt-6 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Images className="text-[#d41367]" size={18} />
            <div>
              <h2 className="font-black text-slate-900">Photo Gallery</h2>
              <p className="text-xs tracking-[0.25em] text-slate-500">EVENT ARCHIVE</p>
            </div>
          </div>

          <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/5 px-3 py-1 text-xs font-bold text-[#d41367]">
            {event.photos.length} SHOTS
          </div>
        </div>

        <div className="p-5">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 group">
            {event.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${event.title} — Photo ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.78))]" />

            {event.photos.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/50 p-3 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-950/70"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/50 p-3 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-950/70"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {event.photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-[#d41367]'
                          : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT + PARTNERS */}
      <div className={`mt-6 grid gap-6 ${event.partners?.length > 0 ? 'lg:grid-cols-[1.4fr_1fr]' : ''}`}>

        {/* ABOUT */}
        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="h-2.5 w-2.5 rounded-full bg-[#d41367] animate-pulse" />
            <div>
              <h2 className="font-black text-slate-900">About the Event</h2>
              <p className="text-xs tracking-[0.25em] text-slate-500">MISSION OVERVIEW</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-base leading-8 text-slate-600">
              {event.description}
            </p>

            {event.sections?.map((sec, idx) => (
              <div key={idx} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d41367]/10 text-[#d41367] font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}>
                    {sec.title}
                  </h3>
                </div>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-base leading-8 text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {event.closing?.map((p, cIdx) => (
              <div key={cIdx} className="rounded-2xl border-l-4 border-[#d41367] bg-[#d41367]/5 p-5 text-base leading-8 text-slate-700 font-medium">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* PARTNERS */}
        {event.partners?.length > 0 && (
          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div>
                <h2 className="font-black text-slate-900">Event Partners</h2>
                <p className="text-xs tracking-[0.25em] text-slate-500">ALLIED PARTNERS</p>
              </div>
              <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/5 px-3 py-1 text-xs font-bold text-[#d41367]">
                {event.partners.length} PARTNERS
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap justify-center gap-5">
                {event.partners.map((sponsor, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center shadow-sm group-hover:border-[#d41367] group-hover:shadow-md transition-all duration-300">
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="h-3/4 w-3/4 object-contain"
                        />
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          LOGO
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      {sponsor.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
