import React from 'react';
import { Heart, Bike, Accessibility, Award, ShieldCheck, Sparkles, Phone, ExternalLink, MessageCircle, ClipboardList } from 'lucide-react';

const CONTACTS = [
  {
    name: 'Rtr. Ishita Poddar',
    role: 'EC Community Service Director',
    phone: '+91 9376717679',
    phoneRaw: '+919376717679',
    waRaw: '919376717679'
  },
  {
    name: 'Rtr. S.S. Mahalakshmi',
    role: 'DC Community Service Director',
    phone: '+91 9113967388',
    phoneRaw: '+919113967388',
    waRaw: '919113967388'
  }
];

export default function WheelsOfHope() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

      {/* HERO SECTION: LEFT INFO + RIGHT FITTED IMAGE */}
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-xl">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-400 to-amber-500" />

        <div className="grid lg:grid-cols-12 items-center gap-6 p-6 sm:p-8 lg:p-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
              <Sparkles size={14} className="text-[#d41367] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
                DISTRICT COMMUNITY SERVICE INITIATIVE
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight"
              style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
            >
              Wheels of Hope
            </h1>

            <p className="text-lg sm:text-xl font-bold italic tracking-wide text-[#d41367]">
              "Empowering Mobility. Inspiring Independence."
            </p>

            <div className="h-1 w-20 rounded-full bg-linear-to-r from-[#d41367] to-pink-300" />

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              Mobility is more than movement—it is the foundation of education, opportunity, dignity, and independence.{' '}
              <span className="font-semibold text-slate-900">Wheels of Hope</span> is a humanitarian initiative dedicated to transforming lives by providing{' '}
              <span className="font-semibold text-[#d41367]">bicycles to deserving government school students</span> and{' '}
              <span className="font-semibold text-[#d41367]">wheelchairs to individuals with mobility challenges</span>.
            </p>

            {/* HERO CTA BUTTON */}
            <div className="pt-1">
              <a
                href="https://forms.gle/jMxGg9mZqHKRQ91P9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-[#d41367] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-[#d41367]/25 transition hover:bg-[#b00e54] hover:shadow-xl hover:-translate-y-0.5"
              >
                <ClipboardList size={18} />
                Club Registration Form
                <ExternalLink size={16} />
              </a>
            </div>

            {/* CONTACT DETAILS REPLACING STAT BOXES */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-2.5">
                Initiative Contacts
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACTS.map((person) => (
                  <div key={person.name} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1.5 shadow-xs">
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{person.name}</p>
                      <p className="text-[10px] font-bold text-[#d41367] uppercase tracking-wider">{person.role}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${person.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#d41367] transition bg-white border border-slate-200 rounded-xl px-2.5 py-1"
                      >
                        <Phone size={12} className="text-[#d41367]" />
                        {person.phone}
                      </a>
                      <a
                        href={`https://wa.me/${person.waRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition"
                        title="WhatsApp Chat"
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FITTED IMAGE CONTAINER */}
          <div className="lg:col-span-5 flex items-center justify-center rounded-3xl bg-white p-2">
            <img
              src="/assets/Events/wheels of hope.webp"
              alt="Wheels of Hope — Empowering Mobility"
              className="w-full h-auto max-h-[580px] object-contain rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* TWO MAIN INITIATIVE PILLARS */}
      <section className="grid gap-6 md:grid-cols-2">

        {/* PILLAR 1: BICYCLE DISTRIBUTION */}
        <div className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#d41367]/40 flex flex-col justify-between">
          <div className="h-1.5 w-20 rounded-full bg-linear-to-r from-[#d41367] to-pink-400 mb-5" />

          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d41367]/10 text-[#d41367]">
                <Bike size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d41367]">
                  STUDENT EMPOWERMENT
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-black text-slate-900"
                  style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
                >
                  Bicycle Distribution
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-3.5 text-slate-600 leading-relaxed text-base">
              <p>
                Education should never be limited by distance. Under this initiative, bicycles will be provided to{' '}
                <span className="font-semibold text-slate-900">
                  meritorious government school students who have successfully passed Class 9 and are progressing to Class 10
                </span>
                , helping them overcome the challenges of long daily commutes to school.
              </p>
              <p>
                The selection is based on the prescribed eligibility criteria, recognizing students who have demonstrated academic excellence and determination despite their circumstances.
              </p>
              <p className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium text-slate-700">
                By reducing travel time and physical barriers, a bicycle becomes more than a means of transport—it becomes a vehicle for opportunity, enabling students to attend school regularly, focus on their education, and pursue their dreams with confidence.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d41367]">
            <ShieldCheck size={16} />
            Eligibility & Merit Based Selection
          </div>
        </div>

        {/* PILLAR 2: WHEELCHAIR DISTRIBUTION */}
        <div className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#d41367]/40 flex flex-col justify-between">
          <div className="h-1.5 w-20 rounded-full bg-linear-to-r from-amber-500 to-[#d41367] mb-5" />

          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d41367]/10 text-[#d41367]">
                <Accessibility size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d41367]">
                  DIGNITY & ACCESSIBILITY
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-black text-slate-900"
                  style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
                >
                  Wheelchair Distribution
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-3.5 text-slate-600 leading-relaxed text-base">
              <p>
                For individuals with physical disabilities or mobility challenges, a wheelchair is more than an assistive device—it is a pathway to independence, dignity, and inclusion.
              </p>
              <p>
                Through <span className="font-semibold text-slate-900">Wheels of Hope</span>, we aim to restore freedom of movement, improve accessibility, and empower beneficiaries to participate more actively in education, employment, and community life.
              </p>
              <p className="rounded-2xl border border-slate-100 bg-slate-50 p-4 font-medium text-slate-700">
                Restoring freedom of movement fosters social inclusion, enhances personal independence, and opens doors to new socio-economic opportunities for individuals and their families.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d41367]">
            <Award size={16} />
            Restoring Dignity & Mobility
          </div>
        </div>

      </section>

      {/* VISION BANNER */}
      <section className="relative overflow-hidden rounded-4xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-[#d41367]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Heart size={14} className="text-pink-400" />
            <span className="text-xs font-bold tracking-[0.25em] text-white">
              OUR COLLECTIVE MISSION
            </span>
          </div>

          <h3
            className="text-2xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Rajdhani','Inter',sans-serif" }}
          >
            Moving Forward Without Limitations
          </h3>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            <strong className="text-white font-semibold">Wheels of Hope</strong> is built on the belief that every individual deserves the opportunity to move forward without limitations. Through the collective efforts of Rotaract clubs, schools, volunteers, and community partners, we strive to create lasting impact—one bicycle, one wheelchair, and one life at a time.
          </p>

          <div className="pt-2">
            <div className="inline-block rounded-3xl border border-[#d41367]/40 bg-[#d41367]/20 px-6 py-4 backdrop-blur-md">
              <p className="text-base sm:text-lg font-bold tracking-wide text-pink-200">
                Together, let us transform compassion into action and ensure that mobility becomes the foundation for brighter futures.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
