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
        "/static/css/main.4201631c.chunk.css",
        "/static/js/main.fcd976d0.chunk.js",
        "/static/js/main.fcd976d0.chunk.js.map",
        "/static/js/runtime~main.a8a9905a.js",
        "/static/js/runtime~main.a8a9905a.js.map",
        "/static/js/2.52f50ea6.chunk.js",
        "/static/js/2.52f50ea6.chunk.js.map",
        "/index.html",
        "/precache-manifest.7524edb0611e3e8f4ca778c7f757f6f6.js",
        "/service-worker.js",
        "/static/css/main.4201631c.chunk.css.map",
        "/static/media/bg.d07805b2.png",
        "/media/bg.png",
        "/assets/images/bad.gif",
        "/assets/images/good.gif",
        "/assets/images/awesome.png",
        "/assets/images/medium.png",
        "/assets/images/bad.png",
        "/assets/images/music.mp3",
        "favicon.ico"
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

//INSTALL THE APP
let deferredPrompt;

let btnAdd = document.getElementById('install_btn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
   // Update UI notify the user they can add to home screen
   btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});