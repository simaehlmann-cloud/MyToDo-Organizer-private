/* My ToDo Organizer — Service Worker
   Strategie: App-Dateien werden zwischengespeichert, damit die App offline
   startet. Alle Anfragen an Google (Anmeldung, Drive, Kalender) gehen immer
   direkt ins Netz und werden nie gecacht. */
const CACHE = "my-todo-organizer-v8";
const SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Fremd-Hosts (accounts.google.com, googleapis.com …) nie anfassen.
  if (url.origin !== location.origin) return;
  if (e.request.method !== "GET") return;
  // Netz zuerst, Cache als Rückfallebene — so kommen Updates sofort an.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
