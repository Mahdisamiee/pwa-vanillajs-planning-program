const static_cache_name = "static-cache";
const dynamic_cache_name = "dynamic_cache";

const staticAssets = [
  "/",
  "/index.html",
  "/images/icons/icon-48x48.png",
  "/images/icons/icon-144x144.png",
  "/js/app.js",
  "/css/index.css",
  "/offline.html",
  "/css/offline.css",
  "/images/offline/page-not-found.svg",
  "https://kit.fontawesome.com/bc08f79e12.js"
]


self.addEventListener("install" , (event)=>{
    console.log("%c" + "Service Worker Installed" , "font-weight: 700");
    event.waitUntil(
      caches.open(static_cache_name)
        .then((cache)=>{
          console.log("%c" + "[Service Worker] precacheing app shell" , "font-weight: 500");
          // cache.addAll(staticAssest);
          cache.addAll(staticAssets)
          // cache.add("/");
          // cache.add("/index.html");
        })
    )
})


self.addEventListener("activate", (event)=>{
    console.log("%c" + "Service Worker Activated" , "font-weight: 700");
    event.waitUntil(
      caches.keys()
        .then((keyList)=>{
          return Promise.all(
            keyList.map((key)=>{
              if(key !== static_cache_name && key !== dynamic_cache_name){
                console.log("%c" + "old cached file was deleted in service worker. [activate event]", "font-weight: 500;")
                return caches.delete(key);
              }
            })
          )
        })
    )
})

function isInStaticCache(requestUrl , staticAssest) {
  staticAssest.forEach((elem)=>{
    if(requestUrl === elem){
      return true;
    }
    return false;
  })
}

self.addEventListener("fetch", (event)=>{
  const urls = [
    "https://domain/post",
    "https://domain/user",
    "https://domain/login"
  ];

  let finded;
  urls.forEach((elem)=>{
    if(event.request.url.indexOf(elem) > -1){
      finded = elem;
      return;
    }
  })
  if(!!finded){
    event.respondWith(
      // here we should use IndexDb. [IndexDB]
    )
  }else if(isInStaticCache(event.request.url, staticAssets)){
    event.respondWith(
      caches.match(event.request)
        .then((response)=>{
          return response
        })
    )
  }else {
    event.respondWith(
      caches.match(event.request)
        .then((response)=>{
          if(response){
            return response;
          }else{
            return fetch(event.request)
              .then((res) => {
                return caches.open(dynamic_cache_name)
                  .then((cache) => {
                    // trimCaches(dynamicCacheName, 3);
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              }).catch(()=>{
                return caches.open(static_cache_name)
                  .then((cache)=>{
                    if(event.request.headers.get('accept').includes('text/html'))
                      return cache.match('/offline.html')
                  })
              });
          }
        })
    );
  }
})