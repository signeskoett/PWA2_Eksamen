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