const CACHE_NAME = 'gc-pro-v1';
const ASSETS_TO_CACHE = [
  '1_Login.html',
  '2_admin.html',
  '3_accueil.html',
  '7_avancement.html',
  '9_pv.html',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
