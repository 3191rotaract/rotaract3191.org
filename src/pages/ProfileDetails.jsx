import { useRef, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Download, Images, FileText } from 'lucide-react';
import { PROFILES } from '../data/profiles.js';

function handlePhotoError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = '/assets/images/placeholder.png';
}

export default function ProfileDetails() {
    const { slug } = useParams();
    const profile = PROFILES.find((p) => p.slug === slug);
    const [copied, setCopied] = useState(false);
    const photosRef = useRef(null);

    if (!profile) return <Navigate to="/resources/profiles" replace />;

    const scrollToPhotos = () => {
        photosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profile.paragraphs.join('\n\n'));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">

            <div className="flex items-center justify-between gap-3">
                <Link
                    to="/resources/profiles"
                    className="group/back inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-[#d41367] hover:bg-[#d41367] hover:text-white hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)]"
                >
                    <ArrowLeft size={16} className="transition-transform duration-300 group-hover/back:-translate-x-1" />
                    Back to Profiles
                </Link>

                <button
                    onClick={scrollToPhotos}
                    className="group/jump inline-flex items-center gap-2 rounded-full border border-[#d41367]/30 bg-[#d41367] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:border-[#d41367] hover:bg-[#d41367] hover:text-white hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)] lg:hidden"
                >
                    <Download size={16} className="transition-transform duration-300 group-hover/jump:translate-y-0.5" />
                    View Photos
                </button>
            </div>

            {/* PROFILE + PHOTOS */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">

                {/* PROFILE TEXT */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5">
                        <img
                            src={profile.primaryPhoto}
                            onError={handlePhotoError}
                            alt={profile.name}
                            className="h-16 w-16 rounded-2xl border border-slate-200 object-cover object-top shadow-sm"
                        />
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d41367]">
                                {profile.designation}
                            </p>
                            <h1 className="mt-1 text-xl font-black leading-tight text-slate-900">
                                {profile.name}
                            </h1>
                            <p className="mt-0.5 text-sm text-slate-600">
                                {profile.designationFull}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-6 pt-5">
                        <div className="flex items-center gap-2">
                            <FileText className="text-[#d41367]" size={16} />
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                                Profile
                            </p>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`group/copy flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                copied
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-[#d41367]/30 bg-white text-[#d41367] hover:-translate-y-0.5 hover:border-[#d41367] hover:bg-[#d41367] hover:text-white hover:shadow-[0_10px_24px_rgba(212,19,103,0.35)]'
                            }`}
                        >
                            {copied ? (
                                <Check size={16} />
                            ) : (
                                <Copy size={16} className="transition-transform duration-300 group-hover/copy:scale-110 group-hover/copy:rotate-6" />
                            )}
                            {copied ? 'Copied' : 'Copy Text'}
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        {profile.paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="text-base leading-8 text-slate-600">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* PHOTO DOWNLOADS */}
                <div ref={photosRef} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm self-start scroll-mt-6">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <div className="flex items-center gap-2">
                            <Images className="text-[#d41367]" size={16} />
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                                Photos
                            </p>
                        </div>

                        <span className="rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-3 py-1 text-xs font-bold text-[#d41367]">
                            {profile.photos.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4">
                        {profile.photos.map((photo, idx) => (
                            <div
                                key={idx}
                                className="group overflow-hidden rounded-2xl border border-slate-200"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                                    <img
                                        src={photo}
                                        onError={handlePhotoError}
                                        alt={`${profile.name} — Photo ${idx + 1}`}
                                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <a
                                    href={photo}
                                    download
                                    className="group/dl flex items-center justify-center gap-1.5 border-t border-[#d41367]/20 bg-[#d41367] px-2 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#b71258] hover:shadow-[0_0_20px_rgba(212,19,103,0.45)]"
                                >
                                    <Download size={14} className="transition-transform duration-300 group-hover/dl:-translate-y-0.5 group-hover/dl:scale-110" />
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
