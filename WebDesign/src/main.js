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

function explorePopUpSignup () {
    const popUp = document.getElementById ("popUpIdSignup");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdSignup" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpSignin () {
    const popUp = document.getElementById ("popUpIdSignin");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdSignin" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpProfile () {
    const popUp = document.getElementById ("popUpIdProfile");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdProfile" || e.target.id == "cbtn") {
            popUp.classList.remove ("show");
        }
    });
}

function explorePopUpSubmit () {
    const popUp = document.getElementById ("popUpIdSubmit");
    popUp.classList.add ("show");
    popUp.addEventListener ("click", (e) => {
        if (e.target.id == "popUpIdSubmit" || e.target.id == "cbtn") {
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

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Manipule os dados recebidos e atualize o DOM conforme necessário
      })
      .catch(error => console.error('Error:', error));
  });
  
  document.getElementById("recipeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const type = document.getElementById("recipeType").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, recipe_type: type, ingredients, instructions }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Recipe submitted successfully!');
        document.getElementById("recipeForm").reset();
        document.getElementById("popUpIdSubmit").classList.remove("show");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting recipe. Please try again.');
    });
});

document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            experience: formData.get('experience')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Response:', response); // Adiciona a depuração da resposta
        if (!response.ok) {
            // Se a resposta não for ok, lança um erro para ser capturado no bloco catch
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data:', data); // Adiciona a depuração do JSON retornado
        alert('Sign up successful!');
        e.target.reset();
        const popUp = document.getElementById('signUpPopUpId');
        if (popUp) { // Verifica se o elemento existe
            popUp.classList.remove('show');
        } else {
            console.warn('Elemento com ID signUpPopUpId não encontrado.');
        }
    })
    .catch(error => {
        console.error('Error:', error); // Adiciona mais detalhes ao erro
        alert('Error signing up');
    });
});

document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const popUp = document.getElementById ("popUpIdSignin");

    fetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error signing in: ' + data.error);
        } else {
            alert('Sign in successful!');
            console.log('User:', data.user);
            localStorage.setItem('isLoggedIn', 'true');
            checkLoginStatus();
            popUp.classList.remove ("show");
            // Redirecionar ou atualizar a interface conforme necessário
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error signing in');
    });
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const signUpLink = document.getElementById('signUpLink');
    const signInLink = document.getElementById('signInLink');
    const profileLink = document.getElementById('profileLink');
    const signOutLink = document.getElementById('signOutLink');

    if (isLoggedIn) {
        signUpLink.classList.add('hidden');
        signInLink.classList.add('hidden');
        profileLink.classList.remove('hidden');
        signOutLink.classList.remove('hidden');
    } else {
        signUpLink.classList.remove('hidden');
        signInLink.classList.remove('hidden');
        profileLink.classList.add('hidden');
        signOutLink.classList.add('hidden');
    }
}

function signOut() {
    localStorage.setItem('isLoggedIn', 'false');
    checkLoginStatus();
}


