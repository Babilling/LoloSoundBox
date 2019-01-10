self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/LoloSoundBox/',
        '/LoloSoundBox/index.html',
        '/LoloSoundBox/style.css',
        '/LoloSoundBox/app.js',
        '/LoloSoundBox/sound-list.js',
        '/LoloSoundBox/images/icon-72x72.png',
        '/LoloSoundBox/images/icon-96x96.png',
        '/LoloSoundBox/images/icon-128x128.png',
        '/LoloSoundBox/images/icon-144x144.png',
        '/LoloSoundBox/images/icon-152x152.png',
        '/LoloSoundBox/images/icon-192x192.png',
        '/LoloSoundBox/images/icon-384x384.png',
        '/LoloSoundBox/images/icon-512x512.png',
        '/LoloSoundBox/sounds/arbre_hurt1.mp3',
        '/LoloSoundBox/sounds/arbre_death.mp3',
        '/LoloSoundBox/sounds/balle de boule.mp3',
        '/LoloSoundBox/sounds/balledeboulepremium.mp3',
        '/LoloSoundBox/sounds/cabiche.mp3',
        '/LoloSoundBox/sounds/cest du bon.mp3',
        '/LoloSoundBox/sounds/enemyHurt1.mp3',
        '/LoloSoundBox/sounds/enemyHurt2.mp3',
        '/LoloSoundBox/sounds/enemyHurt3.mp3',
        '/LoloSoundBox/sounds/enemyHurt4.mp3',
        '/LoloSoundBox/sounds/fatchdefitch.mp3',
        '/LoloSoundBox/sounds/intro_arbre.mp3',
        '/LoloSoundBox/sounds/intro_licorne.mp3',
        '/LoloSoundBox/sounds/licorne_death.mp3',
        '/LoloSoundBox/sounds/licorne_hurt1.mp3',
        '/LoloSoundBox/sounds/onestbienla.mp3',
        '/LoloSoundBox/sounds/pick_hadoken.mp3',
        '/LoloSoundBox/sounds/pick_laser.mp3',
        '/LoloSoundBox/sounds/pick_minigun.mp3',
        '/LoloSoundBox/sounds/tesdanslaxe.mp3',
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
