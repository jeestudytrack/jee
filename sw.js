const cacheName = 'jee-tracker-v1';
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
];

// Install event: cache files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

// Activate event: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== cacheName) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

// Fetch event: serve cached files first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
