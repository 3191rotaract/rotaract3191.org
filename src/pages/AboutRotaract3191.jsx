import { NavLink } from "react-router-dom";

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

const telemetry = [
    { label: "AIRBORNE CLUBS", value: "83", status: "TRACKING" },
    { label: "CREW MEMBERS", value: "1903", status: "DEPLOYED" },
    { label: "COUNCIL MEMBERS", value: "86", status: "EXECUTING" },
    { label: "REVENUE DISTRICTS", value: "04", status: "CONNECTED" },
];

export default function AboutRotaract3191() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,19,103,0.08),transparent_35%)]" />

                <div className="relative grid gap-10 lg:grid-cols-2">

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-[#d41367]" />
                            <span className="text-xs font-bold tracking-[0.3em] text-[#d41367]">
                                DISTRICT ONLINE
                            </span>
                        </div>

                        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 md:text-7xl">
                            ROTARACT
                            <br />
                            DISTRICT 3191
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                            An ensemble of dynamic young leaders from Bangalore,
                            Ramanagara, Kolar, Chittoor and Tirupathi determined to create
                            meaningful impact through service, fellowship and leadership.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {["CONNECT", "PARTNER", "GROW"].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-bold tracking-[0.2em]"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DISTRICT MAP */}
                    <div className="relative">
                        <div className="aspect-square rounded-4xl border border-slate-200 bg-slate-50 overflow-hidden">
                            <img
                                src="/assets/images/map.png"
                                alt="Rotaract District 3191 Map"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* TELEMETRY */}
            <SectionHeader title="DISTRICT TELEMETRY" />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {telemetry.map((item) => (
                    <div
                        key={item.label}
                        className="overflow-hidden rounded-4xl border border-slate-200 bg-white"
                    >
                        <div className="h-2 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

                        <div className="p-6">
                            <p className="text-[10px] font-semibold tracking-[0.3em] text-slate-500">
                                {item.label}
                            </p>

                            <h3 className="mt-4 text-5xl font-black text-slate-900">
                                {item.value}
                            </h3>

                            <div className="mt-5 inline-flex rounded-full border border-[#d41367]/20 bg-[#d41367]/5 px-3 py-1 text-xs font-bold tracking-[0.15em] text-[#d41367]">
                                {item.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* WHO WE ARE */}
            <SectionHeader title="MISSION BRIEF" />

            <div className="grid gap-8 lg:grid-cols-2">

                <div className="rounded-4xl border border-slate-200 bg-white p-8">
                    <p className="text-xs font-semibold tracking-[0.3em] text-slate-500">
                        DISTRICT OVERVIEW
                    </p>

                    <h2 className="mt-4 text-4xl font-black">
                        CONNECT.
                        <br />
                        PARTNER.
                        <br />
                        GROW.
                    </h2>

                    <p className="mt-6 leading-relaxed text-slate-600">
                        Rotaract District 3191 comprises clubs from Bangalore,
                        Ramanagara, Kolar, Chittoor and Tirupathi. Rotaract serves as a
                        launchpad for leadership, service and fellowship while
                        empowering young leaders to create lasting impact.
                    </p>
                </div>

                <div className="aspect-video flex items-center justify-center">
                    <img src="/assets/hero-bg.webp" alt="" className="border border-dashed border-[#d41367] rounded-4xl"/>
                </div>

            </div>
        </div>
    );
}