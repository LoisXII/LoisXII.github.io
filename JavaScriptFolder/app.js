const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
const headerOne = document.querySelector(".headerOne")

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


window.onclick = (e) => {

    headerOne.textContent = "You clicked the page"
    heade

}