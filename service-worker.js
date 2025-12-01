const CACHE_NAME = 'korfbal-scoreboard-v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// Installeren van de service worker en de basisbestanden cachen
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geopend');
        return cache.addAll(urlsToCache);
      })
  );
});

// Verzoeken afhandelen: eerst vanuit de cache proberen, anders via het netwerk
self.addEventListener('fetch', event => {
  // Voorkom dat browser-extensie requests worden gecached
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Alleen geldige responses cachen
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Geef de gecachte versie terug, of ga naar het netwerk als deze niet bestaat
        return response || fetchPromise;
      });
    })
  );
});

// Oude caches opruimen bij een nieuwe versie
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
