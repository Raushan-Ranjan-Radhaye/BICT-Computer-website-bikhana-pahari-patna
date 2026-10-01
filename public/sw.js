/* BICT Computer Education — service worker
 * Purpose: power web notifications on every device (desktop + mobile browsers)
 * and handle notification clicks. Keeps the site installable as a PWA.
 */

const CACHE = "bict-v1";
const OFFLINE_URLS = ["/", "/manifest.webmanifest", "/icons/icon-192.png"];

/* In development we stay a pass-through proxy so `next dev` hot reload and
   on-disk edits are never shadowed by a cached copy. */
const DEV_MODE = new URL(self.location.href).searchParams.get("mode") === "dev";

self.addEventListener("install", (event) => {
  if (DEV_MODE) {
    event.waitUntil(self.skipWaiting());
    return;
  }
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(OFFLINE_URLS))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  if (DEV_MODE) {
    event.waitUntil(self.clients.claim());
    return;
  }
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

/* Network-first for pages so content is always fresh, cache as offline fallback. */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    DEV_MODE
      ? fetch(request)
      : fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches
                .open(CACHE)
                .then((cache) => cache.put(request, copy))
                .catch(() => undefined);
            }
            return response;
          })
          .catch(() =>
            caches.match(request).then((cached) => cached || caches.match("/")),
          ),
  );
});

/* Web push (works once the site is installed / browser allows it). */
self.addEventListener("push", (event) => {
  let payload = {
    title: "BICT Computer Education",
    body: "New update from BICT Computer Education, Patna.",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: "bict-update",
  };

  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch {
    if (event.data) payload.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      tag: payload.tag,
      data: { url: payload.url || "/#courses" },
      vibrate: [120, 60, 120],
    }),
  );
});

/* Show a notification sent by the page itself via postMessage. */
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "BICT_SHOW_NOTIFICATION") return;

  const registration = self.registration;
  event.waitUntil(
    registration.showNotification(data.title || "BICT Computer Education", {
      body: data.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      tag: data.tag || "bict-update",
      renotify: true,
      data: { url: data.url || "/" },
      vibrate: [120, 60, 120],
      requireInteraction: false,
    }),
  );
});

/* Tapping a notification focuses the app (or opens it) at the right section. */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) {
          if ("navigate" in client && client.url !== target) client.navigate(target).catch(() => undefined);
          return client.focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(target) : undefined;
    }),
  );
});