

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then((register)=>{
            console.log("%c" + "Service Worker is Registered" , "font-weight: 700");
            console.log("%c" + register.scope , "font-weight: 700");
        })
        .catch((err)=>{
            console.log(err);
        })
}