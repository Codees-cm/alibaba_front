import React from 'react'
import Script from "next/script";
function Pwa() {
    return (
        <>
       {/* Global site tag (gtag.js) - Google Analytics */}
       {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-GOOGLEID" /> */}
       <Script id="google-analytics" strategy="afterInteractive">
         {`
  const CACHE = "pwabuilder-offline-page";

  // self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
  import workbox from 'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js';
  
  const offlineFallbackPage = "offline.html";
  
  self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });
  
  self.addEventListener('install', async (event) => {
    event.waitUntil(
      caches.open(CACHE)
        .then((cache) => cache.add(offlineFallbackPage))
    );
  });
  
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
  }
  
  workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE
    })
  );
  
  self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const preloadResp = await event.preloadResponse;
  
          if (preloadResp) {
            return preloadResp;
          }
  
          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
  
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })());
    }
  });


  
    
       `}
       </Script>

       <p>
          <button id="myElement"  type="button">Install down</button>
        </p>
     
    
     </>
      );
}

export default Pwa