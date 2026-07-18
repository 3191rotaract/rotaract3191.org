import { CheckCircle2 } from 'lucide-react'

export default function FormSuccessMessage({ title, description }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="flex flex-col items-center gap-4 p-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-emerald-600">
              TRANSMISSION RECEIVED
            </span>
          </div>

          <CheckCircle2 className="text-[#d41367]" size={40} strokeWidth={1.5} />

          <h1 className="text-2xl font-black tracking-tight text-slate-900">{title}</h1>
          <p className="max-w-sm text-sm text-slate-600">{description}</p>

          <div className="mt-3 grid w-full grid-cols-2 gap-3 border-t border-slate-100 pt-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Status</div>
              <div className="mt-1 text-sm font-black text-slate-900">Logged</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 py-3 text-center">
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Next</div>
              <div className="mt-1 text-sm font-black text-slate-900">Review</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
