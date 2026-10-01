"use client";

import { useEffect, useState } from "react";
import { BRAND, NAV_LINKS } from "../data";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 shadow-[0_10px_40px_-22px_rgba(225,29,86,0.55)] backdrop-blur-xl"
          : "bg-white/55 backdrop-blur-md"
      }`}
    >
      {/* top info strip */}
      <div
        className={`overflow-hidden bg-gradient-to-r from-brand-600 via-brand-500 to-purple-500 text-white transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[11px] font-medium tracking-wide sm:text-xs">
          <span className="flex items-center gap-1.5">
            <Icon name="shield" className="h-3.5 w-3.5" />
            {BRAND.approval}
          </span>
          <span className="hidden h-3 w-px bg-white/40 sm:block" />
          <a href={`tel:+91${BRAND.phoneRaw}`} className="flex items-center gap-1.5 transition hover:text-brand-100">
            <Icon name="phone" className="h-3.5 w-3.5" />
            Call: {BRAND.phoneRaw}
          </a>
          <span className="hidden h-3 w-px bg-white/40 sm:block" />
          <span className="hidden sm:inline">{BRAND.tagline}</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <a href="#home" className="group flex shrink-0 items-center gap-3" aria-label={BRAND.name}>
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-300/60 transition-transform duration-500 group-hover:rotate-[14deg] group-hover:scale-110">
            <span className="absolute inset-0 animate-ring rounded-2xl border border-brand-400" />
            <Icon name="computer" className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink-900 sm:text-lg">
              BICT <span className="text-brand-600">Computer</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 sm:text-[11px]">
              Education • Patna
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                active === link.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              `Hello ${BRAND.name}, I want to know about your courses.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold md:inline-flex"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#enquiry"
            className="btn btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold sm:px-5"
          >
            <span className="hidden sm:inline">Enquire Now</span>
            <span className="sm:hidden">Enquire</span>
            <Icon name="arrow" className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-brand-200 bg-white text-brand-600 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-brand-100 bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              } ${
                active === link.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {link.label}
              <Icon name="arrow" className="h-4 w-4 opacity-60" />
            </a>
          ))}
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 px-4 py-3 text-sm font-semibold text-white"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
