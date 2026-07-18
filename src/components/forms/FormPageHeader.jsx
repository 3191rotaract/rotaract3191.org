export default function FormPageHeader({ icon, badgeText, title, description, logo, logoAlt }) {
  return (
    <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

      <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
        {logo && (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:h-24 sm:w-24">
            <img src={logo} alt={logoAlt ?? ''} className="h-full w-full object-contain" />
          </div>
        )}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
            {icon}
            <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
              {badgeText}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">{description}</p>
        </div>
      </div>
    </section>
  )
}
