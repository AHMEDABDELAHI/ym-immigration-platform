const YM_CACHE = 'ym-site-v2';
const YM_ASSETS = [
  './', './index.html', './script1.js', './script2.js', './manifest.webmanifest',
  './assets/logo-square.jpg', './assets/office-logo-flag.jpg', './assets/home-office-hero.jpg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(YM_CACHE).then(cache => cache.addAll(YM_ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== YM_CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(YM_CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
    return response;
  }).catch(() => caches.match('./index.html'))));
});
