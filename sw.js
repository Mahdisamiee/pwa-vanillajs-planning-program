

const static_cache_name = "static-cache";

const asserts = [
    "/",
    "/index.html",
    "/images/icons/icon-48x48.png",
    "/images/css/all.min.css",
    "/js/app/js",
    "/css/index.css",
    "/offline.html"
]


self.addEventListener("install" , (event)=>{
    console.log("%c" + "Service Worker Installed" , "font-weight: 700");
    event.waitUntil(
        caches.open(static_cache_name)
            .then((cache)=>{
                console.log("%c" + "[Service Worker] precacheing app shell" , "font-weight: 500");
                cache.addAll(asserts);
            })
    )
})


self.addEventListener("activate", (event)=>{
    console.log("%c" + "Service Worker Activated" , "font-weight: 700");
})

self.addEventListener("fetch", (event)=>{

})