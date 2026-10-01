import { BRAND } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: "pin",
    title: "Address",
    lines: ["BICT Computer Education", "Near Devi Asthan, Saidpur More, Bhikhna Pahari", "Opp. Gopal Medical Hall, Patna - 4"],
    href: "https://www.google.com/maps/search/?api=1&query=BICT+Computer+Education+Saidpur+More+Patna+4",
  },
  {
    icon: "phone",
    title: "Call Us",
    lines: [BRAND.phone, "Mon - Sat: 8 AM to 8 PM", "Sunday: On call"],
    href: `tel:+91${BRAND.phoneRaw}`,
  },
  {
    icon: "whatsapp",
    title: "WhatsApp",
    lines: [BRAND.phone, "Instant reply on chat"],
    href: `https://wa.me/${BRAND.whatsapp}`,
  },
  {
    icon: "mail",
    title: "Email",
    lines: [BRAND.email],
    href: `mailto:${BRAND.email}`,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-10 h-72 w-72 animate-blob rounded-full bg-brand-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <Icon name="pin" className="h-3.5 w-3.5" />
            Visit Us
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Contact &amp; <span className="text-gradient">Location</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
            Come and visit our institute in Patna for free counselling and admission. {BRAND.approval}.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} as="article" delay={i * 90} className="h-full">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="pink-card group flex h-full flex-col items-start gap-3 rounded-2xl p-5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-300/60">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-base font-extrabold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                  {c.title}
                </h3>
                <div className="flex-1 space-y-0.5">
                  {c.lines.map((l) => (
                    <p key={l} className="text-[13px] leading-relaxed text-ink-500">
                      {l}
                    </p>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 opacity-0 transition-all duration-300 group-hover:gap-2.5 group-hover:opacity-100">
                  Open
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* CTA banner */}
        <Reveal delay={140}>
          <div className="pink-card group relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-purple-500 p-7 text-center text-white sm:p-10">
            <span aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 animate-blob rounded-full bg-white/15 blur-3xl" />
            <span aria-hidden className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 animate-blob rounded-full bg-white/10 blur-3xl [animation-delay:3s]" />
            <div className="relative">
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Ready to start your career with BICT?
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm text-white/90 sm:text-base">
                {BRAND.tagline}. Admission open — call us today for free counselling.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a href={`tel:+91${BRAND.phoneRaw}`} className="btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-700 hover:-translate-y-1 hover:shadow-2xl">
                  <Icon name="phone" className="h-5 w-5" />
                  {BRAND.phone}
                </a>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-6 py-3.5 text-sm font-bold text-white hover:-translate-y-1 hover:bg-white/15"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
