// Service Worker basique pour PWA
const CACHE_NAME = 'kaizen-evolution-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/data/kaizenMasterDB.js',
  '/services/KaizenCoachAI.js',
  '/app.js',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css'
];

// Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la version en cache ou fetch la requête
        return response || fetch(event.request);
      }
    )
  );
});