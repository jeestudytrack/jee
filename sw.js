const CACHE_NAME = "jee-tracker-v1";

/* Install new service worker immediately */
self.addEventListener("install", event => {
  self.skipWaiting();
});

/* Activate and remove old caches */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* Fetch latest files first, fallback to cache only if offline */
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});
