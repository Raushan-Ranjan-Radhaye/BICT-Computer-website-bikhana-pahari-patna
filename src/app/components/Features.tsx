import { FEATURES } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <Icon name="shield" className="h-3.5 w-3.5" />
            Why Choose BICT
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Features &amp; <span className="text-gradient">Facilities</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
            Everything you need to learn fast, practise more and get placed faster — built into every single course
            at BICT Computer Education.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} as="article" delay={(i % 3) * 90} className="h-full">
              <div className="pink-card group flex h-full gap-4 rounded-2xl p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-300/60">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Free typing certificate feature */}
          <Reveal as="article" delay={180} className="h-full">
            <div className="pink-card group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 p-5 text-white">
              <span className="pointer-events-none absolute -right-6 -bottom-8 h-28 w-28 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Icon name="keyboard" className="h-6 w-6" />
              </span>
              <div className="relative min-w-0">
                <h3 className="font-display text-base font-extrabold">Free Typing Certificate</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/90">
                  Typing in Hindi &amp; English with an approved and additional certificate.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
