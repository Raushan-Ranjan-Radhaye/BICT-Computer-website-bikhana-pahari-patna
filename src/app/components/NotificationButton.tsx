"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import {
  canRequestPermission,
  currentPermission,
  isIOS,
  isStandalone,
  notificationsSupported,
  registerServiceWorker,
  requestPermission,
  showNotification,
  type PermissionState,
} from "@/app/lib/notifications";
import { BRAND } from "../data";
import Icon from "./Icon";

type Props = {
  /** `icon` = compact bell (header), `full` = labelled button (hero / enquiry). */
  variant?: "icon" | "full";
  className?: string;
};

const COPY: Record<PermissionState, { label: string; tip: string }> = {
  default: { label: "Get Alerts", tip: "Course & admission updates" },
  granted: { label: "Alerts On", tip: "Notifications enabled" },
  denied: { label: "Alerts Blocked", tip: "Blocked in browser settings" },
  unsupported: { label: "Alerts Unavailable", tip: "Not supported here" },
};

/* ---------- Permission store (reads browser state without extra renders) ---- */

/**
 * Everything the button needs to know about the browser, in one snapshot.
 * Both values read `window` / `navigator`, so they must never be read while
 * rendering on the server — doing so produces different HTML than the client
 * renders and triggers a hydration error.
 */
type NotificationSnapshot = {
  permission: PermissionState;
  canRequest: boolean;
};

/* What the server renders: the safe, pre-hydration assumption. React reuses
   this exact value for the first client render, so both always match. */
const SERVER_SNAPSHOT: NotificationSnapshot = {
  permission: "default",
  canRequest: false,
};

const listeners = new Set<() => void>();

/* getSnapshot must be referentially stable between store changes, otherwise
   React re-renders forever. */
let cached: NotificationSnapshot = SERVER_SNAPSHOT;

function readSnapshot(): NotificationSnapshot {
  const next: NotificationSnapshot = {
    permission: currentPermission(),
    canRequest: canRequestPermission(),
  };
  if (
    next.permission !== cached.permission ||
    next.canRequest !== cached.canRequest
  ) {
    cached = next;
  }
  return cached;
}

/** Notifies every mounted bell that the browser permission may have changed. */
function emitPermissionChange() {
  cached = readSnapshot();
  listeners.forEach((l) => l());
}

function subscribeToPermission(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onVisible = () => {
    if (document.visibilityState === "visible") onStoreChange();
  };
  window.addEventListener("focus", onStoreChange);
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("focus", onStoreChange);
    document.removeEventListener("visibilitychange", onVisible);
  };
}

export default function NotificationButton({ variant = "icon", className = "" }: Props) {
  /* Permission lives in the browser, so read it as external state. This also
     picks up changes the visitor makes from the address-bar / settings UI. */
  const { permission, canRequest } = useSyncExternalStore(
    subscribeToPermission,
    readSnapshot,
    () => SERVER_SNAPSHOT,
  );
  const [busy, setBusy] = useState(false);

  /* Register the service worker that powers notifications and PWA install. */
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const enable = useCallback(async () => {
    if (busy) return;
    setBusy(true);

    try {
      // 1. iOS Safari only allows notifications for an installed PWA.
      if (notificationsSupported() && isIOS() && !isStandalone()) {
        toast.info("Install the app first", {
          description:
            "On iPhone/iPad: tap the Share button, then 'Add to Home Screen'. Open it from your Home Screen and tap the bell again.",
          duration: 9000,
        });
        return;
      }

      // 2. Ask the browser (must happen inside this click handler).
      const result = await requestPermission();
      emitPermissionChange();

      if (result === "granted") {
        await registerServiceWorker();
        const shown = await showNotification(`${BRAND.name} alerts are on`, {
          body: "You will now get batch timings, admission and course updates here.",
          tag: "bict-welcome",
          url: "/#courses",
        });
        toast.success("Notifications enabled", {
          description: shown
            ? "We sent a test alert so you know it works."
            : "This site can now show alerts on this device.",
        });
        return;
      }

      if (result === "denied") {
        toast.error("Notifications are blocked", {
          description:
            "Tap the lock or bell icon in your browser address bar, allow notifications for this site, then reload the page.",
          duration: 9000,
        });
        return;
      }

      if (result === "unsupported") {
        toast.error("Notifications not supported", {
          description:
            "Your browser or connection (must be HTTPS) does not allow notifications.",
        });
        return;
      }

      toast.info("Permission not decided", {
        description: "Please try again and choose 'Allow' in the browser prompt.",
      });
    } finally {
      setBusy(false);
    }
  }, [busy]);

  const isGranted = permission === "granted";
  const { label, tip } = COPY[permission];

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={enable}
        disabled={busy || permission === "unsupported"}
        aria-label={isGranted ? "Notifications enabled" : "Enable notifications"}
        title={isGranted ? "Notifications are enabled" : "Enable notifications"}
        className={`btn grid h-11 w-11 place-items-center rounded-xl border transition-all duration-300 disabled:cursor-not-allowed ${
          isGranted
            ? "border-brand-400 bg-brand-50 text-brand-600"
            : "border-brand-200 bg-white text-brand-600 hover:border-brand-400 hover:bg-brand-50"
        } ${className}`}
      >
        <span className="relative">
          <Icon name="bell" className="h-5 w-5" />
          {isGranted ? (
            <span className="absolute -right-1 -top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-white">
              <Icon name="check" className="h-2 w-2" />
            </span>
          ) : (
            !canRequest && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-400" />
            )
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={enable}
      disabled={busy}
      className={`btn inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-brand-200 bg-white px-5 py-3.5 text-sm font-bold text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-brand-50 hover:shadow-xl hover:shadow-brand-200/70 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${
        isGranted ? "border-brand-400 bg-brand-50" : ""
      } ${className}`}
    >
      <span className="relative">
        <Icon name="bell" className="h-5 w-5" />
        {isGranted && (
          <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-brand-500 text-white">
            <Icon name="check" className="h-2.5 w-2.5" />
          </span>
        )}
      </span>
      <span className="text-left leading-tight">
        <span className="block">{busy ? "Please wait..." : label}</span>
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-500">
          {tip}
        </span>
      </span>
    </button>
  );
}