
let form = document.querySelector(".form");

let name = form.elements.namedItem('name');
let email = form.elements.namedItem('email');
let tel = form.elements.namedItem('tel');
let password = form.elements.namedItem('password');

name.addEventListener('input', validate)
email.addEventListener('input', validate)
tel.addEventListener('input', validate)
password.addEventListener('input', validate)


let validate = (e) => {
    let target = e.target.name

    switch(target) {
        case 'name': 
        case 'email':
        case 'tel':
        case 'password': 
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('adawd');
    return true;
})


