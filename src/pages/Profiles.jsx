import { Search, Radar, Users } from "lucide-react";
import { Download, FileText, Image as ImageIcon } from "lucide-react";

const profiles = [
    {
        id: 1,
        name: "Rtn. Anil Gupta",
        position: "District Governor",
        photo: "/assets/team/2026-27/DG.jpeg",
        pdf: "/assets/profiles/DG-Sridhar-BR.pdf",
        designation: "DG",
    },
    {
        id: 2,
        name: "PDRR Rtn. Umesh P.",
        position: "District Rotaract Committee Chair",
        photo: "/assets/team/2026-27/DRC.jpeg",
        pdf: "/assets/profiles/DRCC-Arun-Teja.pdf",
        designation: "DRCC",
    },
    {
        id: 3,
        name: "Rtn. Rtr. Anirudh G Kulkarni",
        position: "District Rotaract Representative",
        photo: "/assets/team/2026-27/core-team/Anirudh.webp",
        pdf: "/assets/profiles/DRR-Anirudh-Kulkarni.pdf",
        designation: "DRR",
    },
    {
        id: 4,
        name: "PDRR Rtn. Karthik Kittu",
        position: "District Youth Service Director",
        photo: "/assets/team/2026-27/DYSD.jpeg",
        pdf: "/assets/profiles/DYSD-Karthik-Kittu.pdf",
        designation: "DYSD",
    },
    {
        id: 5,
        name: "Rtn. Rtr. Rohan A",
        position: "District Rotaract Representative Elect",
        photo: "/assets/team/2026-27/core-team/Rohan A.jpg",
        pdf: "/assets/profiles/DRRE-Rohan-A.pdf",
        designation: "DRRE",
    },
];

function ProfileCard({ profile }) {
    return (
        <div
            className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367] hover:shadow-xl"
        >
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={profile.photo}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/images/placeholder.png' }}
                    alt={profile.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    PERSONNEL FILE
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-900">
                    {profile.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                    {profile.position}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                    <a
                        href={profile.photo}
                        download
                        className="
              flex items-center justify-center gap-2
              rounded-xl border border-slate-200
              bg-slate-50 px-4 py-3
              text-sm font-semibold
              hover:border-[#d41367]
            "
                    >
                        <ImageIcon size={16} />
                        Photo
                    </a>

                    <a
                        href={profile.pdf}
                        className="
              flex items-center justify-center gap-2
              rounded-xl bg-[#d41367]
              px-4 py-3
              text-sm font-semibold text-white
              hover:opacity-90
            "
                    >
                        <FileText size={16} />
                        PDF
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Profiles() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
                <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

                <div className="p-8 flex flex-col md:flex-row justify-between gap-6 md:gap-12 lg:gap-16">
                    <div className="gap-8">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
                                <Radar size={14} />
                                <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
                                    COMMAND DIRECTORY
                                </span>
                            </div>

                            <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
                                District Profiles
                            </h1>
                        </div>
                    </div>
                    <div className="w-1/4 animate-pulse">
                        <p className="text-slate-800 border font-semibold border-slate-400 text-base rounded-lg p-4">
                            Access official profile photographs and profile PDFs
                            for district leadership and Rotary leadership.
                        </p>
                    </div>
                </div>
            </section>

            {/* GRID */}

            <div className="grid gap-6 my-6 md:grid-cols-2 xl:grid-cols-3">

                {profiles.map((profile) => (
                    <ProfileCard
                        key={profile.id}
                        profile={profile}
                    />
                ))}

            </div>

            {/* CTA */}

            <div className="mt-16 rounded-4xl border border-slate-200 bg-white p-8 text-center">
                <Users
                    size={40}
                    className="mx-auto text-[#d41367]"
                />

                <h2 className="mt-4 text-3xl font-black">
                    Need Additional Resources?
                </h2>

                <p className="mt-3 text-slate-600">
                    Visit the Brand Center or Documents Command Center
                    for branding assets and official district resources.
                </p>
            </div>

        </div>
    );
}