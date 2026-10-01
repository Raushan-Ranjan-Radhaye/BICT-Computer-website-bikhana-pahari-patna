"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_LINKS } from "../data";
import Icon from "./Icon";
import NotificationButton from "./NotificationButton";
import logo from "../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const barRef = useRef<HTMLElement>(null);

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

 
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Close the sheet on Escape, when the viewport grows into the desktop nav,
     and lock page scrolling behind the open sheet. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1280px)"); // matches the `xl` breakpoint
    const onChange = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={barRef}
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/85 shadow-[0_10px_40px_-22px_rgba(225,29,86,0.55)] backdrop-blur-xl"
          : "bg-white/55 backdrop-blur-md"
      }`}
    >
      {/* top info strip */}
      <div
        className={`overflow-hidden bg-gradient-to-r from-brand-600 via-brand-500 to-purple-500 text-white transition-all duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-6 gap-y-1 px-3 py-2 text-center text-[11px] font-medium tracking-wide sm:flex-row sm:px-6 sm:text-center sm:text-xs">
          <span className="flex min-w-0 items-center gap-1.5">
            <Icon name="shield" className="h-3.5 w-3.5 shrink-0" />
            {/* Full ministry line needs ~360px; below `sm` it wraps and clips. */}
            <span className="whitespace-nowrap sm:hidden">{BRAND.approvalShort}</span>
            <span className="hidden whitespace-nowrap sm:inline">{BRAND.approval}</span>
          </span>
          <span className="hidden h-3 w-px bg-white/40 sm:block" />
          <a
            href={`tel:+91${BRAND.phoneRaw}`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap transition hover:text-brand-100"
          >
            <Icon name="phone" className="h-3.5 w-3.5 shrink-0" />
            Call: {BRAND.phoneRaw}
          </a>
          <span className="hidden h-3 w-px bg-white/40 sm:block" />
          {/* Tagline only once the strip is wide enough to hold all three
              items on a single line — otherwise the strip grows to 3 rows. */}
          <span className="hidden whitespace-nowrap lg:inline">{BRAND.tagline}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        {/* Logo */}
        <a href="#home" className="group flex min-w-0 shrink items-center gap-2 sm:gap-3" aria-label={BRAND.name}>
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-brand-200/70 bg-[#F2EEE2] shadow-md shadow-brand-200/60 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-brand-300/60 sm:h-12 sm:w-12 sm:rounded-2xl md:h-14 md:w-14">
            <Image
              src={logo}
              alt={`${BRAND.name} logo`}
              width={56}
              height={56}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          {/* min-w-0 + truncate: if a screen is too tight for the wordmark it
              shrinks, it never pushes the menu button off-screen. */}
          <span className="min-w-0 leading-tight">
            <span className="block truncate whitespace-nowrap font-display text-[13px] font-extrabold tracking-tight text-ink-900 sm:text-lg">
              BICT <span className="text-brand-600">Computer</span>
            </span>
            <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-500 sm:text-[11px] sm:tracking-[0.2em]">
              Education • Patna
            </span>
          </span>
        </a>

        {/* Desktop nav — starts at `xl`; the six links plus three action
            buttons need ~1044px, so at `lg` (1024px) they used to overflow. */}
        <nav className="hidden shrink-0 items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link relative whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-300 ${
                active === link.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-700 hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* shrink-0 keeps the bell + menu button visible at every width. */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
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
            aria-label="Enquire now"
            className="btn btn-primary inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full sm:h-auto sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm sm:font-semibold"
          >
            <span className="hidden whitespace-nowrap sm:inline">Enquire Now</span>
            {/* Icon-only below `sm`: the label does not fit next to the logo. */}
            <Icon name="arrow" className="h-4 w-4 shrink-0" />
          </a>
          {/* Notification opt-in bell — one tap allows alerts on this device */}
          <NotificationButton variant="icon" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-200 bg-white text-brand-600 transition-all duration-300 hover:border-brand-400 hover:bg-brand-50 active:scale-95 sm:h-11 sm:w-11 xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu — vertical link list */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`overscroll-contain border-t border-brand-100 bg-white/95 backdrop-blur-xl transition-all duration-500 xl:hidden ${
          open
            ? "max-h-[calc(100dvh-4rem)] opacity-100 overflow-y-auto"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
          {/* vertical stacked links */}
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.href ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
                    active === link.href
                      ? "border-transparent bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-md shadow-brand-300/50"
                      : "border-brand-200 bg-white text-ink-700 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                  }`}
                >
                  {link.label}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 opacity-70" />
                </a>
              </li>
            ))}
          </ul>

          {/* actions — full-width enquiry CTA (the header button is icon-only
              on phones), then call / WhatsApp side by side */}
          <div className="mt-3 flex flex-col gap-2">
            <a
              href="#enquiry"
              onClick={() => setOpen(false)}
              className="btn btn-primary inline-flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold"
            >
              Enquire Now
              <Icon name="arrow" className="h-4 w-4 shrink-0" />
            </a>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:+91${BRAND.phoneRaw}`}
              onClick={() => setOpen(false)}
              className="btn btn-primary inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold"
            >
              <Icon name="phone" className="h-4 w-4 shrink-0" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          {/* enable notifications on this phone / browser */}
          <NotificationButton variant="full" className="mt-2.5 w-full !py-3" />
        </nav>
      </div>
    </header>
  );
}
