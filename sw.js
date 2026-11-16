const V="ppc-v1",PRE=["./","index.html","manifest.webmanifest","chart.umd.js","icon-192.png","icon-512.png"];
const CDN=["fonts.googleapis.com","fonts.gstatic.com","cdn.jsdelivr.net","cdnjs.cloudflare.com"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin){
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put("index.html",c));return x;}).catch(()=>caches.match("index.html").then(m=>m||caches.match("./"))));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x;})));return;}
 if(CDN.includes(u.host)){e.respondWith(caches.open(V).then(c=>c.match(r).then(m=>{const f=fetch(r).then(x=>{c.put(r,x.clone());return x;}).catch(()=>m);return m||f;})));}
});
