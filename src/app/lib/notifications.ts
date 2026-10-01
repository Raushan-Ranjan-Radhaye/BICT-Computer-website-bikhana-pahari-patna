"use client";

/**
 * Cross-device notification helpers.
 *
 * Support matrix:
 * - Chrome / Edge / Firefox (desktop + Android): Notification API works directly.
 * - Safari on iOS/iPadOS 16.4+: only works for a site **installed to the Home
 *   Screen** (standalone PWA). We detect that case and show install guidance.
 * - Older iOS Safari or insecure (http) contexts: not supported.
 */

export type PermissionState = "default" | "granted" | "denied" | "unsupported";

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const iosStandalone = (
    window.navigator as Navigator & { standalone?: boolean }
  ).standalone;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    iosStandalone === true
  );
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ reports a desktop UA but exposes touch points.
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  );
}

/** Whether this browser/context can ever show notifications. */
export function notificationsSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "Notification" in window && "serviceWorker" in navigator;
}

/**
 * iOS Safari only exposes the Notification API inside an installed PWA.
 * So: supported = desktop/Android browsers, or iOS while standalone.
 */
export function canRequestPermission(): boolean {
  if (!notificationsSupported()) return false;
  if (isIOS()) return isStandalone();
  return true;
}

export function currentPermission(): PermissionState {
  if (!notificationsSupported()) return "unsupported";
  return Notification.permission as PermissionState;
}

/**
 * Asks the browser for notification permission.
 * Must always be triggered from a real user gesture (click/tap).
 */
export async function requestPermission(): Promise<PermissionState> {
  if (!canRequestPermission()) return "unsupported";
  try {
    const result = (await Notification.requestPermission()) as PermissionState;
    return result;
  } catch {
    return currentPermission();
  }
}

/** Whether we can render a notification right now. */
export function canNotify(): boolean {
  return notificationsSupported() && Notification.permission === "granted";
}

/**
 * Shows a system notification. Uses the service worker when available so it
 * works the same way on phones and desktops, and falls back to the page API.
 */
export async function showNotification(
  title: string,
  options: { body?: string; tag?: string; url?: string } = {},
): Promise<boolean> {
  if (!canNotify()) return false;

  const { body = "", tag = "bict-update", url = "/" } = options;

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      // `active` is null on the very first load; `ready` waits for activation.
      const worker =
        registration.active ?? (await navigator.serviceWorker.ready);
      (worker as ServiceWorker | undefined)?.postMessage({
        type: "BICT_SHOW_NOTIFICATION",
        title,
        body,
        tag,
        url,
      });
      return true;
    }
  } catch {
    /* fall through to the page-level API */
  }

  try {
    const n = new Notification(title, {
      body,
      tag,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    } as NotificationOptions);
    n.onclick = () => {
      window.focus();
      window.location.hash = url.replace(/^.*#/, "#");
    };
    return true;
  } catch {
    return false;
  }
}

/** Registers the service worker that backs notifications and PWA install. */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  // Service workers need HTTPS (localhost is the only http exception).
  if (!window.isSecureContext) return null;

  try {
    // `mode=dev` tells the worker to skip its cache layer, so local development
    // never serves stale HTML or assets.
    const mode = process.env.NODE_ENV === "production" ? "prod" : "dev";
    return await navigator.serviceWorker.register(`/sw.js?mode=${mode}`, {
      scope: "/",
    });
  } catch {
    return null;
  }
}