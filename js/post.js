

// fetch data from server
const url = "https://domain/post";
let networkDataRecived = false;
// fetch fresh data
fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
        console.log("cached new data from network");
        networkDataRecived = true;
        updataUI(data);
    })
// fetch old data [cache] ===================> as soon as posible change this to indexDB
if('caches' in window) {
    caches.match(url)
        .then(response=>{
            return response.json() || new Error("no data cached!");
        })
        .then((data)=>{
            if(!networkDataRecived){
                updataUI(data);
            }
        })
}


//post data to server



