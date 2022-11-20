let openBtn = document.querySelector ('.bi-list');
let closeBtn = document.querySelector ('.bi-x-lg');

let menu = document.querySelector (".navbar__menu");

let count = 1;
document.getElementById("radio1").checked = true;

let countSweet = 4;
document.getElementById("radio4").checked = true;

setInterval ( function () {
    nextImage ();
}, 5000)

function nextImage () {
    count++;

    if (count > 3) {
        count = 1;
    }
    console.log("radio"+count)

    countSweet++;

    if (countSweet > 6) {
        countSweet = 4;
    }
    console.log("radio"+countSweet)
    document.getElementById("radio"+countSweet).checked = true;
    document.getElementById("radio"+count).checked = true;
}

openBtn.addEventListener ("click", ()=>{
    nav.classList.add ("top");
    openBtn.classList.toggle ("hide");
    closeBtn.classList.toggle ("hide");
    menu.classList.toggle ("hidden");    
})

closeBtn.addEventListener ("click", ()=>{
    nav.classList.remove ("top");
    openBtn.classList.toggle ("hide");
    closeBtn.classList.toggle ("hide");
    menu.classList.toggle ("hidden");   
})

var nav = document.getElementById("nav");
var menu_ = document.getElementById("menu_");

window.onscroll = function () {
    if (window.pageYOffset >= menu.offsetTop) {
        nav.classList.add ("sticky");
    }   else {
        nav.classList.remove ("sticky");
    }
}

function explorePopUp () {
    const popUp = document.getElementById ("popUpId");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpId" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpAbout () {
    const popUp = document.getElementById ("popUpIdAbout");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdAbout" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpPartners () {
    const popUp = document.getElementById ("popUpIdPartners");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdPartners" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpTeams () {
    const popUp = document.getElementById ("popUpIdTeams");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdTeams" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}