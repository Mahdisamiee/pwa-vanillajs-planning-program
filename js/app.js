
const BasePassword = "Ali-fa-2000"
const table = document.querySelector("#main-table");
const store = [];
//***customize settings;
const root = document.documentElement;
    //header color
const headerColorPicker = document.querySelector("#color-picker");
    //background color
const backgroundColorPicker = document.querySelector("#background-color-picker");
    //font size
const containerFontSize = document.querySelector("#container-font-size")
    //reset settings
const resetSettings = document.querySelector("#reset-settings")
const defaultHeaderColor = headerColorPicker.value;
const defaultBackgroundColor = backgroundColorPicker.value;
const defaultFontSize = containerFontSize.value; 
    //drawer settings
const drawer = document.querySelector("div.drawer");
const openBtn = document.querySelector("#menu-icon");
const closeBtn = document.querySelector("#close-btn");


// action for save data on localstorage and read data from that.
function saveData() {
    for(let i = 1 ; i <= 11 ; i++){
        let subArr = [];
        for(let j = 1 ; j <= 7 ; j++){
            let obj = {
                title : table.rows[i].cells[j].childNodes[1].childNodes[1].value,
                description : table.rows[i].cells[j].childNodes[1].childNodes[3].value
            }
            console.log()
            subArr.push(obj);
            obj = null;
        }
        store.push(subArr);
        subArr = null;
    }
    window.localStorage.removeItem("store");
    window.localStorage.setItem("store", JSON.stringify(store));
}

function resetData() {
    if(!localStorage.getItem('store')){
        alert("there is no data to delete!")
        return;
    }
    let password = prompt("enter password");

    if(!(password === BasePassword)){
        alert("password was Wrong")
        return;
    }
    localStorage.removeItem("store");
    location.reload();
}


//calling data save and data delete
document.querySelector("#saveBtn").addEventListener("click", saveData);
document.querySelector("#resetBtn").addEventListener("click", resetData);


//****customize settings */
headerColorPicker.addEventListener("change" , ()=>{
    window.localStorage.setItem('header-color', headerColorPicker.value);
    root.style.setProperty("--table-header-color", headerColorPicker.value);
});
backgroundColorPicker.addEventListener("change", ()=>{
    window.localStorage.setItem("background-color", backgroundColorPicker.value);
    root.style.setProperty("--table-background-color", backgroundColorPicker.value);
});
containerFontSize.addEventListener("change", ()=>{
    window.localStorage.setItem("font-size", containerFontSize.value);
    root.style.setProperty("--container-font-size", containerFontSize.value+"px");
})
    // drawer btn
closeBtn.addEventListener("click", ()=>{
    drawer.style.setProperty("transform" , "translateX(270px)");
})
openBtn.addEventListener("click", ()=>{
    drawer.style.setProperty("transform" , "translateX(0px)");
})

// reset settings
resetSettings.addEventListener("click" , ()=>{
    let answer = prompt("Are sure to reset settings?");
    if(!(answer === "y" || answer === "yes")){
        return;
    }
    root.style.setProperty("--table-background-color", defaultBackgroundColor);
    root.style.setProperty("--table-header-color", defaultHeaderColor);
    root.style.setProperty("--container-font-size", defaultFontSize+"px");
    localStorage.removeItem("header-color");
    localStorage.removeItem("background-color");
    localStorage.removeItem("font-size");
    location.reload();
})






//reload window 
window.onload = () => {
    console.log("data loaded")
    if(!!localStorage.getItem('store')){
        let loadStore =JSON.parse(window.localStorage.getItem("store"))
        
        for(let i = 1 ; i <= 11 ; i++){//here we should mines from loadstore because its start from 0 but our node begin from 1;
            for(let j = 1 ; j <= 7 ; j++){
                table.rows[i].cells[j].childNodes[1].childNodes[1].value = loadStore[i-1][j-1].title;
                table.rows[i].cells[j].childNodes[1].childNodes[3].value = loadStore[i-1][j-1].description;
                // console.log(loadStore[i][j].title)
            }
        }
    } 


    if(!!localStorage.getItem('header-color')){
        console.log("header color is set")
        root.style.setProperty("--table-header-color", window.localStorage.getItem('header-color'));
        headerColorPicker.value =  window.localStorage.getItem('header-color');    
    }
    if(!!localStorage.getItem("background-color")){
        console.log("background color is exist");
        root.style.setProperty("--table-background-color", window.localStorage.getItem("background-color"));
        backgroundColorPicker.value = window.localStorage.getItem("background-color");
    }
    if(!!localStorage.getItem("font-size")){
        console.log("font size is exist");
        root.style.setProperty("--container-font-size", window.localStorage.getItem("font-size")+"px");
        containerFontSize.value = window.localStorage.getItem("font-size");
    }
    
}