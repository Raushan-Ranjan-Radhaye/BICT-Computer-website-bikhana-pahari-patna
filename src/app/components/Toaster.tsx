"use client";

import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      duration={4500}
      /* Keeps toasts clear of the fixed header on phones and desktop alike. */
      offset={72}
      mobileOffset={{ top: 76, bottom: 24, left: 12, right: 12 }}
      /* Full-width, thumb-friendly toasts on small screens. */
      toastOptions={{
        classNames: {
          toast: "!rounded-2xl !font-sans !shadow-lg",
          title: "!font-bold",
          description: "!text-xs sm:!text-sm",
          closeButton: "!border-brand-200 !bg-white !text-brand-600",
        },
        style: {
          // iOS notch / Android status-bar safe padding.
          paddingTop: "env(safe-area-inset-top)",
        },
      }}
    />
  );
}