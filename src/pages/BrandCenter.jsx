import React from 'react'
import { NavLink } from 'react-router-dom'

const brandSections = [
    {
        id: 'logos',
        title: 'Brand and Logos',
        accent: 'PRIMARY',
        link: '/resources/logos',
        items: ['Download official Rotaract District 3191 logos and branding guidelines to maintain consistency across all platforms.'],
    },
    {
        id: 'documents',
        title: 'Documents and Resources',
        accent: 'BRIEFING',
        link: '/resources/documents',
        items: ['Access official documents and resources to help you plan and execute successful projects and events.'],
    },
    {
        id: 'profiles',
        title: 'Profiles',
        link: '/resources/profiles',
        accent: 'TEAM',
        items: ['Learn more about the Rotaract District 3191 team and get their Profiles.'],
    },
]

const cockpitMetrics = [
    { label: 'District', value: '3191' },
    { label: 'Zones', value: '4' },
    { label: 'Clubs', value: '78' },
]

export default function BrandCenter() {

    return (
        <div className="relative min-h-screen bg-transparent overflow-hidden text-slate-900">
            <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <section className="rounded-4xl border border-white/70 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6">
                    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-row items-center gap-6 justify-center">
                            <div className="h-3 w-3 rounded-full bg-[#d41367] shadow-[0_0_0_7px_rgba(212,19,103,0.14)]" />
                            <div>
                                <p className="text-2xl md:text-5xl font-black tracking-tight text-slate-900">
                                    RESOURCES
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {cockpitMetrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="min-w-20 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-center"
                                >
                                    <div className="text-[9px] font-semibold uppercase tracking-[0.26em] text-slate-500">{metric.label}</div>
                                    <div className="mt-1 text-sm font-black text-slate-900">{metric.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 gap-4">
                        <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">Your deck</p>
                                    <h2 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">Resources - Logos, Documents and Profiles</h2>
                                </div>
                                <div className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d41367]">
                                    UNDER CONTROL
                                </div>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {brandSections.map((section) => (
                                    <article
                                        key={section.id}
                                        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fd_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#d41367] via-[#ff8fb0] to-slate-900" />
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">{section.accent}</p>
                                            <div className="h-2.5 w-2.5 rounded-full bg-[#d41367]" />
                                        </div>

                                        <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{section.title}</h3>

                                        <div className="mt-4 grid gap-2">
                                            {section.items.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-5 flex justify-center align-bottom">
                                            <NavLink
                                                to={section.link}
                                                className="
            group relative inline-flex items-center gap-2
            rounded-xl border border-slate-300 bg-white
            px-5 py-2.5 text-sm font-bold uppercase tracking-[0.15em]
            text-slate-800 shadow-sm
            transition-all duration-300
            hover:-translate-y-0.5 hover:border-[#d41367]
            hover:shadow-[0_8px_20px_rgba(212,19,103,0.15)]
        "
                                            >
                                                <span className="h-2 w-2 rounded-full bg-[#d41367] animate-pulse" />
                                                Access
                                                <svg
                                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13 5l7 7-7 7M5 12h15"
                                                    />
                                                </svg>

                                                <span className="absolute inset-0 rounded-xl bg-linear-to-r from-[#d41367]/0 via-[#d41367]/10 to-[#d41367]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            </NavLink>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        
                    </div>
                </section>
            </main>
        </div>
    )
}