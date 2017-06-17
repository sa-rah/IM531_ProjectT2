var dataCacheName = 'gamefamData-v1';
var cacheName = 'gamefam-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/bundle.js',
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell' + cache);
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  if (e.request.url.indexOf('stream') > -1 || e.request.url.indexOf('/api/') > -1) {
    console.log('[ServiceWorker] Going straight to network for', e.request.url);
    return;
  }

  if (e.request.url.indexOf('http://localhost:3005/lists') > -1) {
    console.log('[ServiceWorker] Trying to fetch, then cache for', e.request.url);
    e.respondWith(
      caches.open(dataCacheName).then(function (cache) {
        return fetch(e.request).then(function (response) {
          cache.put(e.request.url, response.clone());
          return response;
        }).catch(function (err) {
          return caches.match(e.request).then(function (response) {
            return response;
          })
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        if (!response) {
          console.log('not found in cache - fetching', e.request.url);
        }
        return response || fetch(e.request);
      })
    );
  }
});

self.addEventListener('push', function (event) {
  console.log(`[Service Worker] Push received. Data: "${event.data.text()}"`);
  const title = 'gamefam';
  const options = {
    body: 'Yay it works.',
    icon: '',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('sync', function (event) {
  console.log('[Service Worker] Sync event!');

  const title = 'gamefam';
  const options = {
    body: 'We are online again!',
    icon: '',
  };

  event.waitUntil(fetch('/api/available')
    .then(() => self.registration.showNotification(title, options)));
});