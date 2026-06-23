import React, { useState } from 'react';
import { ZONES } from '../data/zones.js';

export default function Zones() {
  const [activeZone, setActiveZone] = useState(ZONES[0].id);

  const activeZoneData = ZONES.find(z => z.id === activeZone);

  return (
    <div className="flex flex-col gap-10 py-12 px-4 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">

      {/* HERO */}
      <div className="text-center space-y-5">

        <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#d41367]" />
          <span className="text-xs font-black tracking-[0.3em] text-[#d41367]">
            TACTICAL AIRSPACE
          </span>
        </div>

        <h1
          className="text-5xl md:text-6xl font-black text-slate-900"
          style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
        >
          DISTRICT ZONES
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore zone leadership, club network and operational structure.
        </p>

      </div>

      {/* ZONE SELECTOR */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {ZONES.map((zone) => {
          const isActive = activeZone === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`
            group relative overflow-hidden rounded-[2rem]
            border bg-white transition-all duration-300
            ${isActive
                  ? "border-[#d41367] shadow-xl scale-[1.02]"
                  : "border-slate-200 hover:-translate-y-1 hover:shadow-lg"
                }
          `}
            >

              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: zone.themeColor }}
                />
              )}

              <img
                src={zone.jetImage}
                alt={zone.name}
                className="
              h-40 md:h-52 w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4">
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-black tracking-[0.2em] text-white"
                  style={{ backgroundColor: zone.themeColor }}
                >
                  AIRSPACE
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">

                <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                  Zone Command
                </p>

                <h3
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
                >
                  {zone.name}
                </h3>

              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE AIRSPACE */}

      <div
        className="
      overflow-hidden
      rounded-[2rem]
      border border-slate-200
      bg-white
      shadow-sm
    "
      >

        <div
          className="h-1"
          style={{ backgroundColor: activeZoneData.themeColor }}
        />

        <div className="p-8">

          <div className="text-center">

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `${activeZoneData.themeColor}15`,
                color: activeZoneData.themeColor,
              }}
            >
              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeZoneData.themeColor }}
              />

              <span className="text-xs font-black tracking-[0.3em]">
                FLIGHT CREW
              </span>
            </div>

            <h2
              className="mt-5 text-4xl font-black"
              style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
            >
              {activeZoneData.name}
            </h2>

            <p className="mt-2 text-slate-500 uppercase tracking-[0.25em] text-xs">
              Zonal Rotaract Representatives
            </p>

          </div>

          {/* ZRRS */}

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {activeZoneData.leaders.map((leader, idx) => (
              <div
                key={idx}
                className="
              group rounded-[1.5rem]
              border border-slate-200
              bg-slate-50
              p-5 text-center
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
              >

                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg">

                  <img
                    src={`${leader.picture}`}
                    alt={leader.picture}
                    className="h-full w-full object-cover"
                  />

                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {leader.name}
                </h3>

                <div
                  className="mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-black tracking-[0.2em]"
                  style={{
                    backgroundColor: `${activeZoneData.themeColor}15`,
                    color: activeZoneData.themeColor,
                  }}
                >
                  ZRR COMMAND
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* AIRSPACE MANIFEST */}

      <div
        className="
      overflow-hidden
      rounded-[2rem]
      border border-slate-200
      bg-white
      shadow-sm
    "
      >

        <div
          className="h-1"
          style={{ backgroundColor: activeZoneData.themeColor }}
        />

        <div className="p-8">

          <div className="flex items-center gap-4 mb-10">

            <div
              className="h-3 w-3 rounded-full animate-pulse"
              style={{ backgroundColor: activeZoneData.themeColor }}
            />

            <h2
              className="text-3xl font-black uppercase"
              style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
            >
              Airspace Manifest
            </h2>

            <div className="flex-1 h-px bg-slate-200" />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {activeZoneData.clubs.map((club, idx) => (
              <a href={club.clubWebsite}>
                <div
                  key={idx}
                  className="
              group rounded-2xl
              border border-slate-200
              bg-slate-50
              p-4
              transition-all duration-300
              hover:border-[#d41367]
              hover:-translate-y-1
              hover:bg-white
            "
                >

                  <div className="flex gap-4 items-center">

                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow">

                      <img
                        src={
                          club.presidentPhoto ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(club.name)}&size=120`
                        }
                        alt={club.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        Club Commander
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900 line-clamp-2">
                        {club.name}
                      </h3>
                      <p
                        className="mt-2 text-xs font-black tracking-[0.15em]"
                        style={{ color: activeZoneData.themeColor }}
                      >
                        PRESIDENT
                      </p>
                      <h3 className="mt-1 font-bold text-slate-900 line-clamp-2">
                        {club.name}
                      </h3>


                    </div>

                  </div>

                </div>
              </a>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}
