window.addEventListener("load", () => {
    function handleNetworkChange(event) {
    if (navigator.onLine) {
      document.body.classList.remove("offline");
    } else {
      document.body.classList.add("offline");
    }
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    });


    if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("%PUBLIC_URL%/sw.js")
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

     function registerPeriodicSync() {
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(function(reg) {
                if (reg.periodicSync) {
                    reg.periodicSync.register({
                            tag: 'periodicSync',
                            minPeriod: 0,
                            powerState: 'auto',
                            networkState: 'any'
                        })
                        .then(function(event) {
                            console.log('Periodicc registration successful', event);
                        })
                        .catch(function(error) {
                            console.log('Periodicc registration failed', error);
                        });
                } else {
                    console.log("Background not supported");
                }
            });
        } else {
            console.log("Nove ServiceWorker");
        }
    }