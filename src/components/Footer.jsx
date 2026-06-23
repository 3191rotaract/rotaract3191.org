export const socialLinks = [
  { logo: '/assets/icons/instagram.png', href: 'https://www.instagram.com/rotaract.3191/' },
  { logo: '/assets/icons/x.png', href: 'https://x.com/rotaract3191' },
  { logo: '/assets/icons/facebook.png', href: 'https://www.facebook.com/rotaract3191' },
  { logo: '/assets/icons/linkedin.png', href: 'https://www.linkedin.com/company/rotaract3191/' },
  { logo: '/assets/icons/youtube.png', href: 'https://www.youtube.com/@rotaract3191' },
]

function Footer() {

  return (
    <footer className="mx-4 mb-4 mt-16 sm:mx-6 lg:mx-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">

        {/* Top telemetry strip */}
        <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

        <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div className="flex items-center justify-center gap-4">

            <div className="hidden md:flex items-center gap-2">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#d41367]" />
              <span className="text-[10px] font-black tracking-[0.3em] text-[#d41367]">
                DISTRICT ONLINE
              </span>
            </div>

            <div className="hidden h-5 w-px bg-slate-200 md:block" />

            <div className="text-center md:text-left">
              <h3 className="text-sm font-black tracking-tight text-slate-900">
                ROTARACT DISTRICT 3191
              </h3>

              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Fellowship through service
              </p>
            </div>
          </div>

          {/* Center */}
          <div className="hidden xl:flex items-center gap-2">
            {[
              "BANGALORE",
              "RAMANAGARA",
              "KOLAR",
              "CHITTOOR",
            ].map((region) => (
              <div
                key={region}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-slate-600"
              >
                {region}
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 justify-center">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-200"
              >
                <img src={link.logo} alt={link.label} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-2">
          <div className="flex flex-col gap-2 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">

            <p className="text-[11px] tracking-[0.15em] text-slate-500 uppercase">
              Flight Deck v2026 | Web And Tech Squadron
            </p>

            <p className="text-[11px] tracking-[0.15em] text-slate-500 uppercase">
              © {new Date().getFullYear()} All Rights Reserved
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;