const CACHE_NAME = 'rediscover-tourism-cache-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.png',
  '/stamp.webp'
];

// Install event - Cache critical static assets with cache-busting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets (cache-busting)');
      const cacheBustPromises = ASSETS_TO_CACHE.map((url) => {
        // Append a timestamp parameter to force the browser to bypass HTTP cache
        const bustUrl = new URL(url, self.location.href);
        bustUrl.searchParams.set('_cb', Date.now().toString());
        
        return fetch(new Request(bustUrl.toString(), { cache: 'reload' }))
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url} (status: ${response.status})`);
            }
            // Cache the response under the original clean URL
            return cache.put(url, response);
          });
      });
      return Promise.all(cacheBustPromises);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - Delete old caches (Cache Busting)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache, network-first, or stale-while-revalidate
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests, non-http/https, and dev-server internal assets
  if (
    event.request.method !== 'GET' ||
    (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') ||
    requestUrl.pathname.includes('/@vite/') ||
    requestUrl.pathname.includes('/node_modules/') ||
    requestUrl.pathname.includes('hot-update')
  ) {
    return;
  }

  // Completely bypass large video/audio assets to support browser range-requests (seeking) natively
  if (event.request.url.match(/\.(mp3|mp4|webm)$/)) {
    return;
  }

  // Stale-While-Revalidate Strategy for HTML, JS, CSS
  const isStaticDoc = event.request.url.match(/\.(html|js|css)$/) || requestUrl.pathname === '/';
  if (isStaticDoc) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Bypass browser HTTP cache for the background fetch update to prevent serving/caching stale content
          const fetchRequest = new Request(event.request.url, { cache: 'reload' });
          const fetchPromise = fetch(fetchRequest).then((networkResponse) => {
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Network failure: silent fallback
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Cache-First Strategy for Images and Web Fonts
  const isCacheableAsset = event.request.url.match(/\.(png|jpe?g|gif|svg|webp|ico|woff2?|eot|ttf|otf)$/);
  if (isCacheableAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          // Network failure: silent fallback
        });
      })
    );
    return;
  }
});
