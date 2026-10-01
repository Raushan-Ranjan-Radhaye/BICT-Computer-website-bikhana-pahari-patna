import { CAREERS, PROCESS, REVIEWS } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Career() {
  return (
    <>
      {/* ---------- Job opportunities ---------- */}
      <section id="career" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-20 h-72 w-72 animate-blob rounded-full bg-purple-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
              <Icon name="briefcase" className="h-3.5 w-3.5" />
              Job Opportunities
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              Where Our Students <span className="text-gradient">Work</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
              100% job assistance with eligible for all Govt. jobs. Our students are working in offices, government
              departments, design studios and software companies.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {CAREERS.map((c, i) => (
              <Reveal key={c.title} as="article" delay={(i % 3) * 90} className="h-full">
                <div className="pink-card group flex h-full gap-4 rounded-2xl p-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-purple-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-300/60">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- Process ---------- */}
          <div className="mt-16 lg:mt-20">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
                Admission <span className="text-gradient">Process</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-500 sm:text-base">
                Six simple steps from your first enquiry to your first job.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS.map((p, i) => (
                <Reveal key={p.step} as="article" delay={(i % 3) * 90} className="h-full">
                  <div className="pink-card group relative h-full overflow-hidden rounded-2xl p-5">
                    <span className="pointer-events-none absolute -right-2 -top-3 font-display text-6xl font-extrabold text-brand-50 transition-transform duration-500 group-hover:scale-110 group-hover:text-brand-100">
                      {p.step}
                    </span>
                    <div className="relative">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-extrabold text-white shadow-lg shadow-brand-300/50 transition-transform duration-500 group-hover:scale-110">
                        {p.step}
                      </span>
                      <h3 className="mt-3.5 font-display text-base font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ---------- Reviews ---------- */}
          <div className="mt-16 lg:mt-20">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
                Student <span className="text-gradient">Stories</span>
              </h2>
            </Reveal>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {REVIEWS.map((r, i) => (
                <Reveal key={r.name} as="article" delay={i * 110} className="h-full">
                  <figure className="pink-card group flex h-full flex-col rounded-2xl p-6">
                    <Icon name="heart" className="h-6 w-6 text-brand-400 transition-transform duration-500 group-hover:scale-125 group-hover:text-brand-600" />
                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-brand-100 pt-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-extrabold text-white">
                        {r.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-ink-900">{r.name}</p>
                        <p className="text-[11px] font-semibold text-brand-600">{r.course}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
