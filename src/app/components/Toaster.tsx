"use client";

import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      duration={4500}
      toastOptions={{
        classNames: {
          toast: "!rounded-2xl !font-sans !shadow-lg",
        },
      }}
    />
  );
}