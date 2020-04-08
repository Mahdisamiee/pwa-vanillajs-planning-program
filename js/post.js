

function createElement(nodename) {
    return document.createElement(nodename);
}

function appendNode(parent, child) {
    return parent.appendChild(child);
}

function createAudioPlayer(src) {
    let audio = createElement('audio');
    let source = createElement('source');
    audio.setAttribute('controls', true);
    source.setAttribute('src', src);
    source.setAttribute('type', 'audio/mp3');
    appendNode(audio, source);
    return audio;
}
// let div = document.createElement('div');
const mainContainer = document.querySelector("main.container");
function createCards(title, body,picSrc, soundSrc){
    let mainPostDiv = createElement('div');
    let img = createElement('img');
    let subDiv = createElement('div');
    let titleDiv = createElement('h3');
    let descript = createElement('p');
    let player = createAudioPlayer(soundSrc);

// set attribute and content
    mainPostDiv.classList.add('posts');
    img.setAttribute('src', "/images/offline/preview.jpg");
    // img.setAttribute('src', picSrc);

    titleDiv.classList.add('title');
    titleDiv.textContent = title;

    descript.classList.add('description');
    descript.textContent = body;

// append childs
    appendNode(subDiv, titleDiv);
    appendNode(subDiv, descript);
    appendNode(subDiv, player);

    appendNode(mainPostDiv, img);
    appendNode(mainPostDiv, subDiv);

    appendNode(mainContainer, mainPostDiv);
}


function clearCards(){
    while(document.querySelector("main.container").hasChildNodes()){
        document.querySelector("main.container").removeChild(document.querySelector("main.container").lastChild)
    }
}

function updataUI(data){
    clearCards();
    for(let i = 0; i<data.length; i++){
        createCards(data[i].title_short, data[i].title, data[i].artist["picture_big"], data[i].preview);
    }
}

// fetch data from server
const url = "https://sound-time-pwa.firebaseio.com/posts.json";
// const urlTest = "https://deezerdevs-deezer.p.rapidapi.com/search?q=adele";
let networkDataRecived = false;
        // *****fetch fresh data
fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
        console.log("cached new data from network");
        networkDataRecived = true;
        console.log(data);
        let dataArray = [];
        for(let key in data){
            dataArray.push(data[key]);
        }
        console.log(dataArray);
        updataUI(dataArray);
        // for(let key in data) {
        //     createCards(data[key].title_short, data[key].title, data[key].artist["picture_big"], data[key].preview);
        // }
    })
if('indexedDB' in window) {
    console.log('%c' + 'indexedDb is exist', "color: green;");
    readAllData('posts')
        .then((data)=>{
            if(!networkDataRecived){
                console.log('%c' + 'Data fetched from indexedDB', "color: green;", data);
                if(!!data){
                    updataUI(data);
                }
                
            }
        })
}

        // *****test
// fetch(urlTest, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
// 		"x-rapidapi-key": "8f8dbd8abamsh468dac0cb5d8367p1dd860jsncaa14bfbbade"
// 	}
// })
// .then(response => response.json())
// .then((data)=> data.data)
// .then((data)=>{
//     console.log(data)
//     // networkDataRecived = true;
//     // for(let i = 5; i < 11; i++){
//     //     createCards(data[i].title_short, data[i].title, data[i].artist["picture_big"], data[i].preview)
//     // }
// })
// .catch(err => {
// 	console.log(err);
// });


// fetch old data [cache] ===================> as soon as posible change this to indexDB
// if('caches' in window) {
//     caches.match(url)
//         .then(response=>{
//             return response.json() || new Error("no data cached!");
//         })
//         .then((data)=>{
//             if(!networkDataRecived){
//                 createCards(data);
//             }
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// }


//post data to server


