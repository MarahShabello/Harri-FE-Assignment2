import {setInLocalStorage, getFromLocalStorage} from "./countries.js";

let theme = getFromLocalStorage('theme') || 'light';
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const themeMode = document.getElementsByClassName("theme-mode")[0];

function initTheme() {
    checkTheme();
    setTheme();
}

function checkTheme() {
    document.body.className = theme;
    if (theme === "dark") {
        themeIcon.classList.replace("bi-moon", "bi-sun");
        themeMode.textContent = "Light Mode";
    }
}

function switchTheme(callback) {
    themeMode.textContent = `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`;
    if (theme === "dark"){
        themeIcon.classList.replace("bi-sun", "bi-moon")
        theme = "light"
    }
    else {
        themeIcon.classList.replace("bi-moon", "bi-sun")
        theme = "dark"
    }
    document.body.className = theme;
    callback()
}

function setTheme() {
    setInLocalStorage('theme', theme);
}

themeBtn.addEventListener("click", function() {
    switchTheme(setTheme);
});

initTheme();