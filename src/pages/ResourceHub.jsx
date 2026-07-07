import { FileText, ExternalLink, Download, Zap } from "lucide-react";

const links = [
  { id: 1, title: "Year Calendar", type: "pdf", href: '/assets/RI Dist. 3191 - Squadron Year Calendar - RY 2026-27.pdf' },
  { id: 4, title: "Squadron Club Installation Guidelines", type: "pdf", href: '/assets/docs/Clubs Installation Guidelines, RY 2026-27.pdf' },
  { id: 3, title: "Club Installation Slot Booking", type: "link", href: 'https://go.rotaract3191.org/bookinstallation2627' },
  { id: 5, title: "3191 Brand Centre", type: "link", href: '/resources/logos' },
  { id: 6, title: "Club Leaders Form", type: "link", href: 'https://forms.gle/YneKinPpxXSec9rJ8' },
  { id: 7, title: "Squadron Club Leaders Info", type: "link", href: 'https://docs.google.com/spreadsheets/d/1mxPqp4e6ztpHA0cCgXHwh73UuHJiXk1SDNG-OisGfB0/edit?gid=0#gid=0 ' },
  // { id: 8, title: "Squadron District Council Info", type: "link", href: null },
  { id: 9, title: "Guest Profile & Photos", type: "link", href: '/resources/profiles' },
  { id: 10, title: "Annual District Club Dues", type: "pdf", href: '/assets/docs/Club Dues 2026-27.pdf' },
  { id: 11, title: "Q1 - Top Gun Recognition Guidelines", type: "pdf", href: '/assets/docs/Top Gun Recognition Guidelines, Quarter 1.pdf' },
  // { id: 2, title: "Brand Guidelines", type: "pdf", href: null },
];

function LinkRow({ item }) {
  const isPdf = item.type === "pdf";

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 transition-all duration-200 hover:border-[#d41367] hover:bg-white">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
        {isPdf
          ? <FileText size={16} className="text-[#d41367]" />
          : <ExternalLink size={16} className="text-slate-500" />
        }
      </div>

      <div className="flex-1 min-w-0">
        <span className="font-semibold text-slate-900 text-sm">{item.title}</span>
      </div>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {isPdf ? "PDF" : "Link"}
      </span>

      {item.href ? (
        <a
          href={item.href}
          target={isPdf ? undefined : "_blank"}
          rel={isPdf ? undefined : "noreferrer"}
          download={isPdf ? "" : undefined}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#d41367] px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
        >
          {isPdf ? <Download size={13} /> : <ExternalLink size={13} />}
          {isPdf ? "Download" : "Open"}
        </a>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1.5 cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-400">
          {isPdf ? <Download size={13} /> : <ExternalLink size={13} />}
          {isPdf ? "Download" : "Open"}
        </span>
      )}
    </div>
  );
}

export default function ResourceHub() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">

      {/* HERO */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d41367]/20 bg-[#d41367]/10">
            <Zap size={16} className="text-[#d41367]" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">Resource Hub</h1>
            <p className="text-xs text-slate-500">Fast access to squadron forms, documents and resources</p>
          </div>
        </div>
      </section>

      {/* LIST */}
      <div className="mt-4 flex flex-col gap-2">
        {links.map((item) => (
          <LinkRow key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}
