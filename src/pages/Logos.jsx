import { useMemo, useState } from 'react'
import JSZip from 'jszip'
import { logoCollections } from '../data/logos.js'

function LogoCard({ collection, onPreview }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
            <button
                type="button"
                onClick={() => onPreview(collection)}
                className="relative aspect-4/3 overflow-hidden bg-[linear-gradient(180deg,#e2e8f0_0%,#cbd5e1_100%)]"
            >
                <img
                    src={collection.cover}
                    alt={collection.title}
                    className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.78))] px-4 py-4 text-left text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Preview</p>
                    <h2 className="mt-1 text-lg font-bold leading-tight">{collection.title}</h2>
                </div>
            </button>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <p className="text-sm leading-6 text-slate-500">{collection.subtitle}</p>
                <div className="mt-auto flex flex-wrap gap-3 justify-center">
                    <a
                        href={collection.variants[0].file}
                        Acquire
                        className="cursor-pointer inline-flex items-center justify-center rounded-full bg-[#d41367] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(212,19,103,0.22)] transition hover:bg-[#b71258]"
                    >
                        Acquire Image
                    </a>
                    <button
                        type="button"
                        onClick={() => AcquireZip(collection)}
                        className="cursor-pointer inline-flex items-center justify-center rounded-full border border-[#d41367]/20 bg-[#d41367]/5 px-4 py-2 text-sm font-semibold text-[#d41367] transition hover:bg-[#d41367]/15"
                    >
                        {collection.zipLabel}
                    </button>
                    <button
                        type="button"
                        onClick={() => onPreview(collection)}
                        className="cursor-pointer inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Preview
                    </button>
                </div>
            </div>
        </article>
    )
}

async function AcquireZip(collection) {
    const zip = new JSZip()

    const files = await Promise.all(
        collection.variants.map(async (variant) => {
            const response = await fetch(encodeURI(variant.file))
            if (!response.ok) {
                throw new Error(`Failed to fetch ${variant.file}`)
            }

            const blob = await response.blob()
            const extension = variant.file.split('.').pop()?.toLowerCase() || 'png'
            const fileName = `${variant.label.replace(/\s+/g, '-').toLowerCase()}.${extension}`

            return { fileName, blob }
        }),
    )

    files.forEach(({ fileName, blob }) => {
        zip.file(fileName, blob)
    })

    const archive = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(archive)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.Acquire = collection.zipName
    anchor.click()
    URL.revokeObjectURL(url)
}

function Logos() {
    const [activeCollection, setActiveCollection] = useState(null)
    const modalCollection = activeCollection
    const modalFiles = useMemo(() => modalCollection?.variants ?? [], [modalCollection])

    return (
        <div className="min-h-screen text-white">
            <div className="relative min-h-screen overflow-hidden text-pink-50">
                {/* Cockpit Grid Overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute left-0 top-1/4 h-px w-full bg-white" />
                    <div className="absolute left-0 top-2/4 h-px w-full bg-white" />
                    <div className="absolute left-0 top-3/4 h-px w-full bg-white" />
                    <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
                    <div className="absolute left-2/4 top-0 h-full w-px bg-white" />
                    <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
                </div>

                <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">

                    {/* Hero */}
                    <div className="rounded-4xl border border-white/70 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                            <div className="max-w-3xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d41367]">
                                    Flight Operations
                                </p>

                                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                                    Rotaract Identity Control Deck
                                </h1>

                                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                    Access official branding assets, inspect mission-ready
                                    visual modules, and deploy approved identity packages
                                    across clubs, projects, events and district initiatives.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm min-w-55">
                                <div className="flex items-center justify-between">
                                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                                        Asset Sectors
                                    </div>

                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                                </div>

                                <div className="mt-2 text-3xl font-black text-slate-900">
                                    {logoCollections.length}
                                </div>

                                <div className="mt-1 text-xs font-medium text-slate-500">
                                    Systems Operational
                                </div>
                            </div>
                        </div>

                        {/* Cockpit Status Bar */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                                    Fleet Status
                                </div>
                                <div className="mt-1 font-black text-slate-900">
                                    Active
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                                    Assets Loaded
                                </div>
                                <div className="mt-1 font-black text-slate-900">
                                    {logoCollections.length}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                                    Mission Clearance
                                </div>
                                <div className="mt-1 font-black text-[#d41367]">
                                    Ready For Deployment
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Strip */}
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />

                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-700">
                            Rotaract Flight Network Online
                        </span>

                        <span className="ml-auto text-xs text-slate-500">
                            Identity Assets Synced
                        </span>
                    </div>

                    {/* Cards */}
                    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {logoCollections.map((collection) => (
                            <LogoCard
                                key={collection.id}
                                collection={collection}
                                onPreview={setActiveCollection}
                            />
                        ))}
                    </div>
                </section>

                {/* Modal */}
                {modalCollection ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-md">
                        <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-[0_30px_100px_rgba(15,23,42,0.3)]">

                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d41367]">
                                        Hangar Inspection
                                    </p>

                                    <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                                        {modalCollection.title}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setActiveCollection(null)}
                                    className="cursor-pointer rounded-full border border-red-200 text-red-500 font-semibold bg-red-50 px-4 py-2 text-sm  transition hover:bg-red-100"
                                >
                                    Exit Deck
                                </button>
                            </div>

                            <div className="max-h-[calc(90vh-5.5rem)] overflow-y-auto px-5 py-5 sm:px-6">
                                <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">

                                    {/* Main Asset */}
                                    <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#e2e8f0_0%,#cbd5e1_100%)] p-4">

                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <div className="text-[10px] uppercase tracking-[0.3em] text-[#d41367]">
                                                    Primary Asset
                                                </div>

                                                <div className="text-sm text-slate-500">
                                                    Mission Approved Variant
                                                </div>
                                            </div>

                                            <div className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                OPERATIONAL
                                            </div>
                                        </div>

                                        <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm">
                                            <img
                                                src={modalCollection.cover}
                                                alt={modalCollection.title}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() => AcquireZip(modalCollection)}
                                                className="inline-flex items-center justify-center rounded-full bg-[#d41367] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,19,103,0.35)] cursor-pointer"
                                            >
                                                Deploy Package
                                            </button>

                                            <a
                                                href={modalCollection.variants[0].file}
                                                Acquire
                                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Acquire Asset
                                            </a>
                                        </div>
                                    </div>

                                    {/* Variants */}
                                    <div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {modalFiles.map((variant) => (
                                                <div
                                                    key={variant.file}
                                                    className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                                >
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                                                            Flight Variant
                                                        </span>

                                                        <span className="h-2.5 w-2.5 rounded-full bg-[#d41367]" />
                                                    </div>

                                                    <div className="rounded-[1.25rem] bg-[linear-gradient(180deg,#e2e8f0_0%,#cbd5e1_100%)] p-3">
                                                        <img
                                                            src={variant.file}
                                                            alt={variant.label}
                                                            className="h-40 w-full object-contain"
                                                        />
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between gap-3">
                                                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                                                            {variant.label}
                                                        </h3>

                                                        <a
                                                            href={variant.file}
                                                            Acquire
                                                            className="rounded-full bg-[#d41367] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-105 hover:bg-[#b71258]"
                                                        >
                                                            Acquire
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Logos
