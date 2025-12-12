// header 해당 페이지 primary color 적용 ===================
document.addEventListener('DOMContentLoaded', () => {
    let current = window.location.pathname.split("/").pop();

    if (current === "") current = "index.html";

    const menus = document.querySelectorAll(".menu-list .menu a");

    menus.forEach(menu => {
        const link = menu.getAttribute("href");

        if (link.includes(current)) {
            menu.classList.add("active");
        }
    });
});
