document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggle_btn");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    toggleBtn.addEventListener("click", function () {
        dropdownMenu.classList.toggle("active");
    });
});
