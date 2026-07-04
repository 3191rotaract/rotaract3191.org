const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'rotaract3191drr2728@gmail.com',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    label: 'Home Club',
    value: 'Rotaract Club of Bangalore Orchards',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    ),
  }
]

function ContactCard({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  )
}

export default function DrrElect() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="grid lg:grid-cols-2">
          {/* LEFT — PROFILE */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d41367]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
                INCOMING LEADERSHIP
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Know Your
              <br />
              DRR-Elect
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Get to know the leader set to take the helm of Rotaract
              District 3191 — carrying forward the district's mission of
              service, fellowship and leadership into the next term.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                District Rotaract Representative Elect
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Rtn. Rtr. Rohan A
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">

              </p>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Contact Details
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {CONTACT_DETAILS.map((item) => (
                  <ContactCard key={item.label} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — FULL HEIGHT PHOTO */}
          <div className="relative min-h-[420px] lg:min-h-full">
            <img
              src="/assets/team/2026-27/core-team/Rohan A.jpg"
              alt="Rtn. Rtr. Rohan A, District Rotaract Representative Elect"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(15,23,42,0.75))]" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-xs font-bold tracking-[0.25em] text-white">
                RTN. RTR. ROHAN A
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
                DRR-Elect, RI District 3191
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
