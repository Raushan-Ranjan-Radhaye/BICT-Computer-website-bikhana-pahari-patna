"use client";

import { useMemo, useState } from "react";
import { COURSES } from "../courses";
import { BRAND } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

const FILTERS = [
  { id: "all", label: "All Courses" },
  { id: "3", label: "3 Months" },
  { id: "6", label: "6 Months" },
  { id: "12", label: "12 Months" },
];

export default function Courses() {
  const [filter, setFilter] = useState("all");

  const list = useMemo(
    () => (filter === "all" ? COURSES : COURSES.filter((c) => String(c.durationMonths) === filter)),
    [filter],
  );

  return (
    <section id="courses" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Course Offered
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Our <span className="text-gradient">Computer Courses</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
            CCA, CFA, CPT, DCA, DFA, DTP, ADCA and more — all taught practically with one computer per student,
            daily doubt clearing and approved certification.
          </p>
        </Reveal>

        {/* filters */}
        <Reveal delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`btn rounded-full px-5 py-2.5 text-sm font-bold ${
                filter === f.id
                  ? "btn-primary shadow-lg shadow-brand-300/50"
                  : "border border-brand-200 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        {/* cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {list.map((course, i) => (
            <Reveal key={course.code} as="article" delay={(i % 6) * 80} className="h-full">
              <div className="pink-card group flex h-full flex-col overflow-hidden rounded-3xl">
                {/* accent bar */}
                <span
                  className={`h-1.5 w-full bg-gradient-to-r ${course.accent} transition-all duration-500 group-hover:h-2.5`}
                />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${course.accent} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <Icon name={course.icon} className="h-7 w-7" />
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      {course.popular && (
                        <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white">
                          Popular
                        </span>
                      )}
                      <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-700">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900">
                    {course.code}
                  </h3>
                  <p className="mt-1 text-sm font-semibold leading-snug text-ink-700">{course.fullTitle}</p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-brand-600">
                    <Icon name="clock" className="h-4 w-4" />
                    Duration: {course.duration}
                  </div>

                  <ul className="mt-4 flex-1 space-y-2 border-t border-dashed border-brand-100 pt-4">
                    {course.topics.slice(0, 6).map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[13px] leading-snug text-ink-500">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        {t}
                      </li>
                    ))}
                    {course.topics.length > 6 && (
                      <li className="pl-5.5 text-[13px] font-bold text-brand-500">
                        + {course.topics.length - 6} more topics
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 flex gap-2.5">
                    <a
                      href="#enquiry"
                      className="btn btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold"
                    >
                      Enquire
                      <Icon name="arrow" className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:+91${BRAND.phoneRaw}`}
                      aria-label={`Call about ${course.code}`}
                      className="btn btn-ghost grid w-12 place-items-center rounded-xl"
                    >
                      <Icon name="phone" className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* other offerings */}
        <Reveal delay={120} className="mt-12">
          <div className="pink-card overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="mr-2 text-sm font-bold text-ink-700">Also Available:</span>
              {[
                "Hardware & Networking",
                "Computer & Laptop Servicing",
                "Web Designing",
                "Software Development",
                "Data Analytics",
                "ChatGPT & AI",
                "C & JAVA",
                "PYTHON",
                "HTML",
                "Computer Typing",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-brand-500 hover:text-white hover:shadow-md hover:shadow-brand-300/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
