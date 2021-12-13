let green =  document.getElementById('green');
let black =  document.getElementById('black');
let image = document.getElementById('url');

let header = document.querySelector('.header');
green.addEventListener('click', function () { 
    header.classList.toggle('header__green');
    header.classList.add('header__green');
    header.classList.remove('header__black');
    header.classList.remove('header__img');

 })
 img.addEventListener('click', function () { 
    header.classList.add('header__img');
    header.classList.remove('header__green');
    header.classList.remove('header__black');
 })
 black.addEventListener('click', function () { 
    header.classList.toggle('header__black');
    header.classList.add('header__black');
    header.classList.remove('header__green');
    header.classList.remove('header__img');
 })


 
 
 