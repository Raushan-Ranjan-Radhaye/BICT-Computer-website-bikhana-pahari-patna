import { BRAND, TYPING } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

const KEYS = ["A", "S", "D", "F", "J", "K", "L", "E", "R", "T", "W", "Y"];

export default function Typing() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-1/4 h-64 w-64 animate-blob rounded-full bg-brand-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Keyboard visual */}
          <Reveal className="order-2 lg:order-1">
            <div className="pink-card relative mx-auto max-w-md rounded-[2rem] p-6 sm:p-8">
              <div className="animate-ring absolute inset-6 rounded-[1.5rem] border-2 border-dashed border-brand-200" aria-hidden />
              <div className="relative grid grid-cols-4 gap-2.5 sm:gap-3">
                {KEYS.map((k, i) => (
                  <div
                    key={k}
                    className="grid h-12 place-items-center rounded-xl border border-brand-100 bg-brand-50 font-display text-lg font-extrabold text-brand-600 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400 hover:bg-brand-500 hover:text-white hover:shadow-lg hover:shadow-brand-300/60 sm:h-14"
                    style={{
                      animation: `bob 3s ease-in-out ${i * 0.14}s infinite`,
                    }}
                  >
                    {k}
                  </div>
                ))}
              </div>
              <div className="relative mt-3 flex h-14 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600 sm:h-16">
                <span className="animate-bob font-display text-sm font-bold">Typing in Hindi &amp; English</span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
                <Icon name="keyboard" className="h-3.5 w-3.5" />
                Free Certificate
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Get a Free{" "}
                <span className="text-gradient">Typing Certificate</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
                Every student at BICT gets free typing training and an approved typing certificate along with the main
                course certificate. A big plus for government and private job applications.
              </p>
            </Reveal>

            <div className="mt-7 space-y-3.5">
              {TYPING.map((t, i) => (
                <Reveal key={t.title} delay={i * 100}>
                  <div className="pink-card group flex items-start gap-4 rounded-2xl p-4 sm:p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon name={t.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[15px] font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320}>
              <a href={`tel:+91${BRAND.phoneRaw}`} className="btn btn-primary mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold">
                <Icon name="phone" className="h-5 w-5" />
                Call {BRAND.phoneRaw}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
