const cacheName = 'obs-tally-v2';
const staticAssets = [
  '/',

  'manifest.json',

  'index.html',
  'NoSleep.js',

  'img/fav/favicon.ico',

];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});


//Deletion should only occur at the activate event
self.addEventListener('activate', event => {
    var cacheKeeplist = [cacheName];
    event.waitUntil(
        caches.keys().then( keyList => {
            return Promise.all(keyList.map( key => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
.then(self.clients.claim())); //this line is important in some contexts
});


//self.addEventListener('activate', e => {
//  self.clients.claim();
//});

self.addEventListener('fetch', async e => {
  
  const req = e.request;

  //console.log("Fetch worker: ", req.url);

  const url = new URL(req.url);
    //console.log( 'Network only' );
  e.respondWith(networkOnly(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}

async function networkOnly(req) {
  //const cache = await caches.open(cacheName);
  const fresh = await fetch(req);
    //await cache.put(req, fresh.clone());
  return fresh;
}
