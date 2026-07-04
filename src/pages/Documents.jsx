import {
  FileText,
  Download,
  Eye,
  FolderOpen,
  ShieldCheck,
} from "lucide-react";

function getDocumentHref(file) {
  return encodeURI(file);
}

function DocumentActionLink({ href, children, variant, download }) {
  const baseClasses =
    "inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition";

  if (!href) {
    return (
      <span
        className={`${baseClasses} cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400`}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      download={download ? "" : undefined}
      className={
        variant === "primary"
          ? `${baseClasses} bg-[#d41367] text-white hover:opacity-90`
          : `${baseClasses} border border-slate-200 bg-white hover:border-[#d41367]`
      }
    >
      {children}
    </a>
  );
}

const documentSections = [
  {
    id: 1,
    category: "Club Guidelines",
    code: "CG-01",
    documents: [
      {
        title: "Installation Guidelines",
        file: "/assets/docs/Clubs Installation Guidelines, RY 2026-27.pdf",
      },
      // {
      //   title: "Reporting Guidelines - Coming Soon",
      //   file: "/docs/reporting-guidelines.pdf",
      // },
      // {
      //   title: "Brand Guidelines - Coming Soon",
      //   file: "/docs/brand-guidelines.pdf",
      // },
      {
        title: "Club Dues Structure",
        file: "/assets/docs/Club Dues 2026-27.pdf",
      },
    ],
  },
  {
    id: 2,
    category: "Top Gun Recognition Guidelines",
    code: "TG-RecGuide",
    documents: [
      {
        title: "Q1 - Top Gun Recognition Guidelines",
        file: "/assets/docs/Top Gun Recognition Guidelines, Quarter 1.pdf",
      },
    ],
  },
  {
    id: 3,
    category: "District Updates",
    code: "DU-3191",
    documents: [
      {
        title: "Squadron Year Calendar - RY 2026-27",
        file: "/assets/RI Dist. 3191 - Squadron Year Calendar - RY 2026-27.pdf",
      },
    ],
  },
];

function SectionHeader({ title }) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-pink-200" />

        <h2 className="text-center text-lg md:text-3xl font-black uppercase tracking-[0.35em] text-[#d41367]">
          {title}
        </h2>

        <div className="h-px flex-1 bg-pink-200" />
      </div>
    </div>
  );
}

export default function Documents() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">

      {/* HERO */}

      <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">

        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
                  DOCUMENT VAULT
                </span>
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
                Mission Documents
              </h1>

              <p className="mt-4 max-w-2xl text-slate-600">
                Access official district guidelines, reporting standards,
                branding resources and operational manuals.
              </p>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-3">
              {[
                ["FILES", documentSections.reduce((sum, s) => sum + s.documents.length, 0)],
                ["MODULES", documentSections.length],
                ["STATUS", "READY"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center"
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    {label}
                  </div>

                  <div className="mt-2 text-2xl font-black text-slate-900">
                    {value}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* DOCUMENT SECTIONS */}

      <div className="mt-8 space-y-8">

        {documentSections.map((section) => (
          <div
            key={section.id}
            className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">

              <div className="flex items-center gap-3">
                <FolderOpen className="text-[#d41367]" />

                <div>
                  <h2 className="font-black text-slate-900">
                    {section.category}
                  </h2>

                  <p className="text-xs tracking-[0.25em] text-slate-500">
                    {section.code}
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/5 px-3 py-1 text-xs font-bold text-[#d41367]">
                {section.documents.length} FILES
              </div>
            </div>

            <div className="p-5">

              <div className="grid gap-4 md:grid-cols-2">

                {section.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="
                      group
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      p-5
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#d41367]
                    "
                  >
                    <div className="flex items-start justify-between">

                      <div className="flex gap-4 justify-center items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200">
                          <FileText size={20} />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            {doc.title}
                          </h3>
                        </div>
                      </div>

                    </div>

                    <div className="mt-5 flex gap-2">
                      <DocumentActionLink href={getDocumentHref(doc.file)}>
                        <Eye size={16} className="mr-2 inline" />
                        View
                      </DocumentActionLink>

                      <DocumentActionLink
                        href={getDocumentHref(doc.file)}
                        variant="primary"
                        download
                      >
                        <Download size={16} className="mr-2 inline" />
                        Download
                      </DocumentActionLink>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}