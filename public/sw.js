// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
importScripts('serviceworker-cache-polyfill.js');

// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        "/static/css/main.bb1b241a.chunk.css",
        "/static/js/main.bad8e991.chunk.js",
        "/static/js/main.bad8e991.chunk.js.map",
        "/static/js/runtime~main.a8a9905a.js",
        "/static/js/runtime~main.a8a9905a.js.map",
        "/static/js/2.52f50ea6.chunk.js",
        "/static/js/2.52f50ea6.chunk.js.map",
        "/index.html",
        "/precache-manifest.ee40c46e9de67b2da3b1d89abbcb5fbf.js",
        "/service-worker.js",
        "/static/css/main.bb1b241a.chunk.css.map",
        "/static/media/bg.d07805b2.png",
        "/media/bg.png",
        "/assets/images/bad.gif",
        "/assets/images/good.gif",
      ]);
    })
  );
});

//cache først og så snart den får adgang til internet. Så opdatere cachen så man hele tiden får det nyeste data.
//cache falling back to network with frequent update
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});
//it should check if the url exists in the cache, if so get the response from the cache, otherwise get it

//Backgroundsync
self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(
      console.log('Bk TIM')
    );
  }
});