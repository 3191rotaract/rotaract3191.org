import React from 'react';
import { Link } from 'react-router-dom';
import { DISTRICT_EVENTS } from '../data/events.js';

export default function Events() {
  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">

  {/* HEADER */}
  <div className="text-center space-y-4 mb-6">
    <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
      <div className="h-2 w-2 animate-pulse rounded-full bg-[#d41367]" />
      <span className="text-xs font-bold tracking-[0.3em] text-[#d41367]">
        EVENT COMMAND
      </span>
    </div>

    <h1
      className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
      style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
    >
      DISTRICT EVENTS
    </h1>

    <p className="text-slate-600 text-lg md:text-xl font-medium tracking-wide">
      Discover the flagship events that define our Rotaract journey
    </p>

    <div className="mx-auto h-1 w-24 rounded-full bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
  </div>

  {/* EVENTS GRID */}
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

    {DISTRICT_EVENTS.map((event) => (
      <Link
        key={event.slug}
        to={`/events/${event.slug}`}
        className="
          group
          flex flex-col
          overflow-hidden
          rounded-4xl
          border border-slate-200
          bg-white
          shadow-sm
          transition-all duration-300
          hover:-translate-y-2
          hover:border-[#d41367]
          hover:shadow-xl
        "
      >

        {/* TELEMETRY STRIP */}
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        {/* IMAGE */}
        <div className="relative h-52 overflow-hidden">

          <img
            src={event.photos[0]}
            alt={event.title}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

          {/* DATE */}
          <div className="absolute left-4 bottom-4">
            <span
              className="
                rounded-full
                border border-white/20
                bg-white/15
                px-3 py-1
                text-xs font-bold
                tracking-[0.2em]
                text-white
                backdrop-blur-md
              "
            >
              {event.date}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col grow">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            DISTRICT OPERATION
          </p>

          <h2
            className="mt-2 text-2xl font-black text-slate-900 line-clamp-2"
            style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
          >
            {event.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3 grow">
            {event.description}
          </p>

          {/* CTA */}
          <div
            className="
              mt-6 flex items-center gap-2
              text-sm font-black uppercase
              tracking-[0.2em]
              text-[#d41367]
              transition-all
              group-hover:translate-x-1
            "
          >
            View Details

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

        </div>
      </Link>
    ))}

  </div>
</div>
  );
}
