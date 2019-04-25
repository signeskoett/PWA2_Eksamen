// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
import('%PUBLIC_URL%/serviceworker-cache-polyfill.js');
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
       'index.html',
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

//For period sync event---->
self.addEventListener('periodicsync', function(event) {
  if (event.registration.tag == "periodicSync") {
      console.log("Periodic event occurred: ", event);
  }
});