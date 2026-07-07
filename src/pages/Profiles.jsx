import { Link } from "react-router-dom";
import { Radar, Users, ArrowRight } from "lucide-react";
import { PROFILES } from "../data/profiles.js";

function handlePhotoError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/assets/images/placeholder.png';
}

function ProfileCard({ profile }) {
    return (
        <Link
            to={`/resources/profiles/${profile.slug}`}
            className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367] hover:shadow-xl"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                    src={profile.primaryPhoto}
                    onError={handlePhotoError}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d41367]">
                    {profile.designation}
                </p>

                <h3 className="mt-1 text-sm font-black leading-tight text-slate-900">
                    {profile.name}
                </h3>

                <p className="mt-1 text-xs leading-snug text-slate-600">
                    {profile.designationFull}
                </p>

                <div className="mt-3 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d41367]/30 bg-[#d41367]/5 px-3 py-1.5 text-xs font-semibold text-[#d41367] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#d41367] group-hover:bg-[#d41367] group-hover:text-white group-hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)]">
                        View Profile
                        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
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

                            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                                District Profiles
                            </h1>
                        </div>
                    </div>
                    <div className="w-1/4 animate-pulse hidden md:block">
                        <p className="text-slate-800 border font-semibold border-slate-400 text-base rounded-lg p-4">
                            Access official profile photographs and write-ups
                            for district leadership.
                        </p>
                    </div>
                </div>
            </section>

            {/* GRID */}

            <div className="grid grid-cols-2 gap-4 my-6 sm:grid-cols-3 lg:grid-cols-5">

                {PROFILES.map((profile) => (
                    <ProfileCard
                        key={profile.slug}
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
