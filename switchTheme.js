function initTheme() {
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon = document.getElementById("theme-icon");
    const themeMode = document.getElementsByClassName("theme-mode")[0];

    themeBtn.addEventListener("click", function() {
        switchTheme(themeIcon, themeMode);
    });

    window.onload = function checkTheme() {
        const theme = localStorage.getItem("theme");
        document.body.className = theme;
        if (theme === "dark") {
            themeIcon.classList.replace("bi-moon", "bi-sun");
            themeMode.textContent = "Light Mode";
        }
    }
}

function switchTheme(themeIcon, themeMode) {
    let theme = localStorage.getItem("theme");
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
    localStorage.setItem("theme", theme);
}

initTheme();