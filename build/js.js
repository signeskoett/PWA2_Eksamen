window.addEventListener("load", () => {
    function handleNetworkChange(event) {
      let elm = document.getElementById('root');
    if (navigator.onLine) {
      elm.classList.remove("online");
    } else {
      elm.classList.add("offline");
    }
    }
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
  });


    if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
    .then(function(registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    }).catch(function(err) {
      console.log("Service worker registration failed:", err);
    });
    }
    console.log("ServiceWorker registered sw.js");

    if (navigator.serviceWorker) {
        console.log("ServiceWorkerssupported");
     
        navigator.serviceWorker.register('sw.js', {
          scope: './'
        })
        .then(function(reg) {
          console.log("ServiceWorkerstered", reg);
        })
        .catch(function(error) {
          console.log("Failedegister ServiceWorker", error);
        });
     }
     
     navigator.serviceWorker.ready.then(function(swRegistration) {
      return swRegistration.sync.register('myFirstSync');
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