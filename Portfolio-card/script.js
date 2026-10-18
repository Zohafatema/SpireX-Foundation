const contactBtn = document.getElementById("contactBtn");
// Current Year
document.getElementById("year").textContent =
    new Date().getFullYear();


// Contact Button Animation
const contactButton = document.querySelector(".contact-btn");

contactButton.addEventListener("click", function () {

    this.style.transform = "scale(0.96)";

    setTimeout(() => {
        this.style.transform = "";
    }, 150);

});