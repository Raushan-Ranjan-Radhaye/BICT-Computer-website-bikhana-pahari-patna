"use client";

import Image from "next/image";
import { BRAND, NAV_LINKS } from "../data";
import Icon from "./Icon";
import logo from "../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="border-t border-brand-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-brand-200/70 bg-[#F2EEE2] shadow-md shadow-brand-200/60 transition-transform duration-500 hover:scale-105">
                  <Image
                    src={logo}
                    alt={`${BRAND.name} logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <p className="font-display text-lg font-extrabold tracking-tight text-ink-900">
                    BICT <span className="text-brand-600">Computer</span> Education
                  </p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500">
                    {BRAND.regNo}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
                {BRAND.sub}. {BRAND.approval}. {BRAND.tagline}.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["CCA", "CFA", "DCA", "DFA", "DTP", "ADCA"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-500 hover:text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-ink-900">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-ink-500 transition-all duration-300 hover:translate-x-1 hover:text-brand-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-300 transition-all duration-300 group-hover:w-4 group-hover:bg-brand-500" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-ink-900">
                Get In Touch
              </h4>
              <ul className="mt-4 space-y-3.5">
                <li>
                  <a href={`tel:+91${BRAND.phoneRaw}`} className="group flex items-start gap-2.5 text-sm text-ink-500 transition-colors duration-300 hover:text-brand-600">
                    <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-125" />
                    {BRAND.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-ink-500">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>{BRAND.address}</span>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="group flex items-start gap-2.5 text-sm break-all text-ink-500 transition-colors duration-300 hover:text-brand-600">
                    <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500 transition-transform duration-300 group-hover:scale-125" />
                    {BRAND.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-dashed border-brand-200 pt-6 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-ink-500">
              &copy; {year} {BRAND.name}. All rights reserved.
            </p>
            <p className="text-xs text-ink-500">
              Designed &amp; developed with <span className="animate-pulse text-brand-500">&#10084;</span> for students of Patna
            </p>
          </div>
        </div>
      </div>

      {/* sticky mobile call bar */}
      <div className="sticky bottom-0 z-40 flex gap-2 border-t border-brand-100 bg-white/95 p-2.5 backdrop-blur-lg sm:hidden">
        <a href={`tel:+91${BRAND.phoneRaw}`} className="btn btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold">
          <Icon name="phone" className="h-4 w-4" />
          Call Now
        </a>
        <a
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
