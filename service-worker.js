// Very small cache-first SW for demo purposes
const CACHE_NAME = 'activation-bot-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/styles.css',
  '/assets/script.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (new URL(req.url).origin !== location.origin) return; // ignore cross-origin
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
