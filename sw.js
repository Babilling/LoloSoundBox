self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/PWASoundBox/',
        '/PWASoundBox/index.html',
        '/PWASoundBox/style.css',
        '/PWASoundBox/app.js',
        '/PWASoundBox/sound-list.js',
        '/PWASoundBox/images/icon-72x72.png',
        '/PWASoundBox/images/icon-96x96.png',
        '/PWASoundBox/images/icon-128x128.png',
        '/PWASoundBox/images/icon-144x144.png',
        '/PWASoundBox/images/icon-152x152.png',
        '/PWASoundBox/images/icon-192x192.png',
        '/PWASoundBox/images/icon-384x384.png',
        '/PWASoundBox/images/icon-512x512.png',
       
        '/PWASoundBox/sounds/Say!.mp3'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/LoloSoundBox/sounds/null.mp3');
      });
    }
  }));
});
