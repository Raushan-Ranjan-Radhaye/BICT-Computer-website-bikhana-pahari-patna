import { BRAND, STATS } from "../data";
import Icon from "./Icon";
import NotificationButton from "./NotificationButton";

const TICKER = [
  "CCA",
  "CFA",
  "CPT",
  "DCA",
  "DFA",
  "DTP",
  "ADCA",
  "Tally Prime",
  "MS Office",
  "PageMaker",
  "CorelDraw",
  "Photoshop",
  "HTML",
  "Python",
  "Java",
  "Data Analytics",
  "ChatGPT & AI",
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* soft pink background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-[26rem] w-[26rem] animate-blob rounded-full bg-brand-200/45 blur-3xl" />
        <div className="absolute top-24 -right-24 h-[24rem] w-[24rem] animate-blob rounded-full bg-purple-200/40 blur-3xl [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] animate-blob rounded-full bg-brand-100/60 blur-3xl [animation-delay:6s]" />
        {/* dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(244,63,114,0.13)_1px,transparent_0)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ---------- Left ---------- */}
          <div className="animate-pop-in text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              {BRAND.sub}
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
              <span className="text-gradient">BICT Computer</span>
              <br className="hidden sm:block" /> Education
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg lg:mx-0">
              {BRAND.tagline}. Learn computer skills from{" "}
              <span className="font-semibold text-brand-600">CCA, CFA, DCA, DFA, DTP &amp; ADCA</span>{" "}
              courses with one person one computer, daily doubt classes and{" "}
              <span className="font-semibold text-brand-600">100% job assistance.</span>
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#courses" className="btn btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold sm:text-base">
                Explore Courses
                <Icon name="arrow" className="h-5 w-5" />
              </a>
              <a href={`tel:+91${BRAND.phoneRaw}`} className="btn btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold sm:text-base">
                <Icon name="phone" className="h-5 w-5" />
                {BRAND.phoneRaw}
              </a>
              {/* One tap lets this device (phone, tablet or desktop browser) show alerts */}
              <NotificationButton variant="full" className="px-5 py-3.5" />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-ink-500 lg:justify-start sm:text-sm">
              <span className="flex items-center gap-1.5">
                <Icon name="shield" className="h-4 w-4 text-brand-500" />
                {BRAND.regNo}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-brand-500" />
                Govt. Approved Certificate
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="keyboard" className="h-4 w-4 text-brand-500" />
                Free Typing Certificate
              </span>
            </div>
          </div>

          {/* ---------- Right: animated card stack ---------- */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* rotating dashed ring */}
            <div className="absolute left-1/2 top-1/2 hidden h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 sm:block">
              <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-brand-200" />
            </div>

            {/* main card */}
            <div className="pink-card animate-float rounded-[2rem] p-6 shadow-2xl shadow-brand-200/50 sm:p-7">
              <div className="absolute -top-3 -right-3 grid h-16 w-16 animate-bob place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 text-white shadow-xl shadow-brand-400/50">
                <span className="font-display text-xl font-extrabold">ADCA</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-300/60">
                  <Icon name="award" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-500">Most Popular</p>
                  <p className="font-display text-lg font-extrabold text-ink-900">
                    Advance Diploma in Computer Application
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {["Word", "Excel", "PPT"].map((t) => (
                  <div
                    key={t}
                    className="group rounded-xl border border-brand-100 bg-brand-50/60 px-2 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-100"
                  >
                    <Icon name="keyboard" className="mx-auto h-4 w-4 text-brand-500 transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-1 text-[11px] font-bold text-ink-700">{t}</p>
                  </div>
                ))}
                {["Tally", "Access", "DTP"].map((t) => (
                  <div
                    key={t}
                    className="group rounded-xl border border-brand-100 bg-brand-50/60 px-2 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-brand-100"
                  >
                    <Icon name="database" className="mx-auto h-4 w-4 text-brand-500 transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-1 text-[11px] font-bold text-ink-700">{t}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2">
                {["12 Months duration", "One person one computer", "Daily doubt classes", "100% job assistance"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-ink-700">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {t}
                    </li>
                  ),
                )}
              </ul>

              <a href="#courses" className="btn btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold">
                View Course Details
                <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>

            {/* floating stat chips */}
            <div className="animate-float-slow absolute -bottom-5 -left-3 flex items-center gap-2.5 rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-xl shadow-brand-200/60 sm:-left-8">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name="users" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-extrabold leading-none text-ink-900">10,000+</p>
                <p className="text-[10px] font-semibold text-ink-500">Students trained</p>
              </div>
            </div>

            <div className="animate-bob absolute -top-4 -left-2 hidden items-center gap-2.5 rounded-2xl border border-brand-100 bg-white px-4 py-3 shadow-xl shadow-brand-200/60 sm:flex [animation-delay:1s]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name="certificate" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-extrabold leading-none text-ink-900">Govt.</p>
                <p className="text-[10px] font-semibold text-ink-500">Approved</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="pink-card group rounded-2xl px-4 py-5 text-center sm:px-6 sm:py-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <p className="font-display text-2xl font-extrabold text-brand-600 transition-transform duration-500 group-hover:scale-110 sm:text-3xl lg:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-ink-500 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Ticker marquee ---------- */}
      <div className="marquee-mask relative mt-14 overflow-hidden border-y border-brand-100 bg-brand-50/70 py-3.5 lg:mt-20">
        <div className="flex w-max animate-marquee items-center gap-3 hover:[animation-play-state:paused]">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-bold text-brand-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-brand-500 hover:text-white hover:shadow-lg hover:shadow-brand-300/60"
            >
              <Icon name="sparkles" className="h-3.5 w-3.5" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
