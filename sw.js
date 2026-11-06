"use strict";

// Bei jeder Veröffentlichung erhöhen, sobald sich eine App-Datei ändert.
const APP_VERSION = "1.7";
const CACHE_PREFIX = `getraenketracker-420-${encodeURIComponent(new URL(self.registration.scope).pathname)}-shell-`;
const CACHE_NAME = `${CACHE_PREFIX}${APP_VERSION}`;
const APP_FILES = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];
const APP_URLS = APP_FILES.map(file => new URL(file, self.registration.scope).href);
const INDEX_URL = new URL("./index.html", self.registration.scope).href;
const ROOT_PATH = new URL(self.registration.scope).pathname;

self.addEventListener("install", event => {
  // Die Installation ist nur erfolgreich, wenn die vollständige App vorhanden ist.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_URLS.map(url => new Request(url, { cache: "reload" })));
  })());
  // Bewusst kein skipWaiting(): offene Seiten behalten ihre vollständige Version.
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    // Nur eigene alte App-Caches in diesem Pfad löschen – keine Nutzerdaten.
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  // Ausschließlich bekannte, statische Dateien bedienen. Keine Backups/API-Anfragen.
  const canonical = new URL(url.pathname, url.origin).href;
  const asset = request.mode === "navigate" && url.pathname === ROOT_PATH ? INDEX_URL : canonical;
  if (!APP_URLS.includes(asset)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(asset);
    if (cached) return cached;
    // Im Normalfall durch vollständiges Precache nicht nötig; kein Laufzeit-Mischcache.
    try { return await fetch(request); }
    catch (error) {
      return new Response("App-Datei offline nicht verfügbar. Bitte einmal mit Verbindung öffnen.", {
        status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
