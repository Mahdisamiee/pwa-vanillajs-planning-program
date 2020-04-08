


//index db database
let dbPromise = idb.open("posts-store" , 1, (db)=>{
    if(!db.objectStoreNames.contains('posts')){ // a table for saving data like css and html file that comes from server
        db.createObjectStore('posts', {keyPath: 'title'})
    }

    // if(!db.objectStoreNames.contains('sync-posts')){// a table for saving json data that comes from server [background Sync]
    //   db.createObjectStore('sync-posts', {keyPath: 'title'})
    // }
})

function writeData(st, data) {
  return dbPromise
    .then((db)=>{
      let tx = db.transaction(st, 'readwrite');
      let store = tx.objectStore(st);
      store.put(data);
      return tx.complete;
    })
    .then(()=>{
        console.log("%c" + "indexDB is updated with data", "color: blue;");
    })
}

function readAllData(st) { // Read All Data
  return dbPromise
    .then((db)=>{
      let tx = db.transaction(st, 'readonly');
      let store = tx.objectStore(st);
      return store.getAll();
    })
}

function clearAllData(st) {
  return dbPromise
    .then((db)=>{
      let tx = db.transaction(st, 'readwrite');
      let store = tx.objectStore(st);
      store.clear();
      return tx.complete;
    })
}

function deleteItemFromData(st, title) {
  dbPromise
    .then((db)=>{
      let tx = db.transaction(st, 'readwrite');
      let store = tx.objectStore(st);
      store.delete(title);
      return tx.complete;
    })
    .then(()=>{
        console.log("%c" + "the item is deleted.", "color: blue;");
    })
}


//***************** push Api *************************
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


//**********************for picture***********************
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}
