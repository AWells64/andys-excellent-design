let menuButton = document.getElementById("js__menu-button");
let hiddenNav = document.getElementById("js__hidden-nav");

menuButton.addEventListener("click", () => {
    if (hiddenNav.style.display === "none") {
        hiddenNav.style.display = "block";
    } else {
        hiddenNav.style.display = "none";
    }
});