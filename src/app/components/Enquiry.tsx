"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { BRAND, FAQS } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

const inputCls =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-all duration-300 placeholder:text-ink-500/60 focus:border-brand-400 focus:ring-4 focus:ring-brand-200/50 hover:border-brand-300";

const initialForm = {
  name: "",
  phone: "",
  course: "",
};

export default function Enquiry(){
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitting) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const course = form.course.trim();
    const digits = phone.replace(/\D/g, "");

    if (name.length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (digits.length < 10 || digits.length > 13) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (course.length < 2) {
      toast.error("Please type the course you are interested in.");
      return;
    }

    setSubmitting(true);
    const loadingToast = toast.loading("Sending your enquiry...");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `website` is a honeypot field — it is never filled by real users.
        body: JSON.stringify({ name, phone, course, website: "" }),
      });

      const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to send your enquiry right now.");
      }

      toast.dismiss(loadingToast);
      toast.success("Enquiry sent successfully!", {
        description: "Our team will call you back shortly. Thank you for your interest.",
      });
      setSent(true);
      setForm(initialForm);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Something went wrong.", {
        description: `You can also call us directly on ${BRAND.phoneRaw}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-24 h-72 w-72 animate-blob rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-72 w-72 animate-blob rounded-full bg-purple-100/50 blur-3xl [animation-delay:4s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Enquiry Corner
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Book Your <span className="text-gradient">Admission</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
            Fill in your name, mobile number and the course you are interested in. Our team will call you
            back with course fee, duration, batch time and batch date details.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ---- Form ---- */}
          <Reveal>
            <div className="pink-card rounded-3xl p-5 sm:p-7">
              {sent ? (
                <div className="flex animate-pop-in flex-col items-center justify-center gap-3 py-14 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-300/60">
                    <Icon name="check" className="h-8 w-8" />
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-ink-900">Enquiry Received!</h3>
                  <p className="max-w-sm text-sm text-ink-500">
                    Thank you for your interest. Our team will contact you shortly to confirm your admission.
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={() => setSent(false)} className="btn btn-ghost rounded-full px-5 py-2.5 text-sm font-bold">
                      New Enquiry
                    </button>
                    <a href={`tel:+91${BRAND.phoneRaw}`} className="btn btn-primary rounded-full px-5 py-2.5 text-sm font-bold">
                      Call Now
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="name" className="mb-1.5 block text-xs font-bold text-ink-700">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your full name"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="mb-1.5 block text-xs font-bold text-ink-700">
                      Mobile Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="10 digit mobile number"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="course" className="mb-1.5 block text-xs font-bold text-ink-700">
                      Course *
                    </label>
                    <input
                      id="course"
                      type="text"
                      required
                      autoComplete="off"
                      maxLength={120}
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      placeholder="Type your course, e.g. ADCA, CCA, Tally Prime"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                    >
                      {submitting ? "Sending..." : "Submit Enquiry"}
                      <Icon name="arrow" className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="sm:col-span-2 text-center text-[11px] text-ink-500">
                    Prefer to talk? Call{" "}
                    <a href={`tel:+91${BRAND.phoneRaw}`} className="font-bold text-brand-600 hover:underline">
                      {BRAND.phoneRaw}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ---- FAQs ---- */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-3">
              <h3 className="font-display text-xl font-extrabold text-ink-900 sm:text-2xl">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h3>
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="pink-card overflow-hidden rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
                    >
                      <span className="text-sm font-bold text-ink-900 transition-colors duration-300 hover:text-brand-700">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-400 ${
                          isOpen ? "rotate-180 bg-brand-500 text-white" : ""
                        }`}
                      >
                        <Icon name="arrow" className="h-4 w-4 rotate-90" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-[13px] leading-relaxed text-ink-500 sm:px-5">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
