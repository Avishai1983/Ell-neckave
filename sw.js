const CACHE = 'al-nakwa-v7';
const FILES = [
  '/Ell-neckave/',
  '/Ell-neckave/index.html',
  '/Ell-neckave/form-single-feed.html',
  '/Ell-neckave/form-dual-feed.html',
  '/Ell-neckave/form-hv-room.html',
  '/Ell-neckave/form-ev-charging.html',
  '/Ell-neckave/Ral.html',
  '/Ell-neckave/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
