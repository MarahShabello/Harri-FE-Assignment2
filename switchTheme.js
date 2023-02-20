const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const themeMode = document.getElementsByClassName("theme-mode")[0];

themeBtn.addEventListener("click", switchTheme);

function switchTheme() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("Change to dark Mode");
        themeIcon.classList.replace("bi-moon", "bi-sun");
        themeMode.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
        console.log("Change to light Mode");
        themeIcon.classList.replace("bi-sun", "bi-moon");
        themeMode.textContent = "Dark Mode";
    }
}

window.onload = function checkTheme() {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme !== null && localStorageTheme === "dark") {
        document.body.className = localStorageTheme;
        themeIcon.classList.replace("bi-moon", "bi-sun");
        themeMode.textContent = "Light Mode";
    }
}