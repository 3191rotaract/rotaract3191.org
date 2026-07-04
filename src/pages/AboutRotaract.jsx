import { NavLink } from "react-router-dom";

const focusAreas = [
  {
    title: "Promoting Peace",
    icon: "/assets/areas-of-focus/AOF_peace_color_no_title.webp",
    description:
      "Training leaders to foster understanding, empathy and conflict resolution.",
  },
  {
    title: "Fighting Disease",
    icon: "/assets/areas-of-focus/AOF_disease_color_no_title.webp",
    description:
      "Supporting healthcare initiatives and improving access to treatment.",
  },
  {
    title: "Clean Water",
    icon: "/assets/areas-of-focus/AOF_water_color_no_title.webp",
    description:
      "Improving sanitation and access to clean water worldwide.",
  },
  {
    title: "Supporting Education",
    icon: "/assets/areas-of-focus/AOF_education_color_no_title.webp",
    description:
      "Creating opportunities through quality education and literacy.",
  },
  {
    title: "Maternal & Child Health",
    icon: "/assets/areas-of-focus/AOF_maternal_color_no_title.webp",
    description:
      "Improving health and wellbeing of mothers and children.",
  },
  {
    title: "Growing Local Economies",
    icon: "/assets/areas-of-focus/AOF_economic_color_no_title.webp",
    description:
      "Supporting entrepreneurship and sustainable development.",
  },
  {
    title: "Protecting Environment",
    icon: "/assets/areas-of-focus/AOF_environment_color_no_title.webp",
    description:
      "Driving environmental conservation and sustainability projects.",
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

export default function AboutRotaract() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* HERO */}
      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          <div className="md:col-span-2">
            <h1 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
              INTERNATIONAL NETWORK
            </h1>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Rotaract is a <span className="font-semibold text-slate-900">global movement of young leaders, changemakers, and professionals</span> dedicated to creating meaningful impact through service, innovation, and collaboration. Operating in over{" "}
              <span className="font-semibold text-[#d41367]">180+ countries</span>,
              Rotaract empowers individuals to transform ideas into action while
              fostering a culture of leadership, fellowship, and lifelong learning.
              <br />
              <br />
              Through community-driven initiatives, professional development
              opportunities, international partnerships, and humanitarian projects,
              Rotaractors work together to address some of the world's most pressing
              challenges. Whether it is{" "}
              <span className="font-semibold text-slate-900">
                promoting peace, supporting education, protecting the environment,
                improving healthcare, or strengthening local economies
              </span>
              , every project is rooted in the belief that even the smallest actions
              can create lasting change.
              <br />
              <br />

            </p>
          </div>

          {/* IMAGE */}
          <div className="rounded-3xl  aspect-video flex items-center justify-center">
            <img src="/assets/brand-centre/2026-27/Rotaract Masterbrand.png" alt="" />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <SectionHeader title="MISSION OVERVIEW" />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-4xl border border-slate-200 bg-white p-6">
          <h3 className="text-2xl font-black">
            Service. Leadership. Fellowship.
          </h3>

          <p className="mt-4 text-slate-600 leading-relaxed">
            More than just a service organization, Rotaract serves as a{" "}
            <span className="font-semibold text-[#d41367]">
              launchpad for leadership and personal growth
            </span>
            , enabling young people to build meaningful connections across cultures,
            develop professional skills, and become responsible global citizens.
            United by a shared commitment to{" "}
            <span className="font-bold text-slate-900">
              Service Above Self
            </span>
            , Rotaractors continue to inspire positive transformation in their
            communities while creating a stronger, more connected world for future
            generations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            ["Countries", "180+"],
            ["Members", "200K+"],
            ["Clubs", "10K+"],
            ["Established", "1968"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {label}
              </p>

              <p className="mt-2 text-3xl font-black text-[#d41367]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOCUS AREAS */}
      <SectionHeader title="SEVEN AREAS OF FOCUS" />

      <div className="flex flex-wrap justify-center gap-6">
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="w-full md:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)] rounded-4xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-3 rounded-full bg-[#d41367]" />
            </div>

            <div className="mt-5 flex justify-center">
              <div className="w-42 rounded-full flex items-center justify-center">
                <img src={area.icon} alt={area.title} />
              </div>
            </div>
            <p className="mt-4 text-center text-slate-800 text-xl font-semibold">
              {area.title}
            </p>
            <p className="mt-4 text-center text-slate-600">
              {area.description}
            </p>
          </div>
        ))}
      </div>

      {/* HISTORY */}
      <SectionHeader title="HISTORY OF ROTARACT" />

      <section className="grid gap-8 lg:grid-cols-2 items-center">
        <div className=" aspect-4/3 flex items-center justify-center">
          <img src="/assets/images/aboutus.webp" alt="" className="rounded-4xl border border-[#d41367]" />
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6">
          <div className="space-y-6">
            {[
              ["1968", "MISSION INITIATED — First Rotaract Club Chartered"],
              ["1968", "GLOBAL DEPLOYMENT — Rotaract Adopted by Rotary International"],
              ["1968", "INDIA ENTRY — First Indian Rotaract Club Chartered"],
              ["1980s", "WORLD EXPANSION — Presence Established Across Continents"],
              ["1990s", "SERVICE SCALE-UP — Large Community Impact Projects Begin"],
              ["2013", "ELEVATE ROTARACT — Leadership Pathways Enhanced"],
              ["2019", "HISTORIC RECOGNITION — Rotaract Becomes Rotary Membership Type"],
              ["2020", "AUTONOMY UPGRADE — Greater Club Flexibility Introduced"],
              ["2022", "NEXT-GEN GROWTH — Rapid Global Membership Expansion"],
              ["TODAY", "MISSION ACTIVE — 180+ Countries, Thousands of Clubs, One Global Family"],
            ].map(([year, title]) => (
              <div key={year} className="flex gap-4">
                <div className="font-black text-[#d41367] min-w-20">
                  {year}
                </div>

                <div>{title}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 leading-relaxed text-slate-600">
            Rotaract was established in 1968 by Rotary International to engage
            young adults in service, leadership and fellowship. Today it
            continues to empower young leaders worldwide.
          </p>
        </div>
      </section>
    </div>
  );
}