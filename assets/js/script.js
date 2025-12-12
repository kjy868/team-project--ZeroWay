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

// checkbox 로직 ================================================
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".check-box");

    checkboxes.forEach(box => {

        box.addEventListener("click", () => toggle(box));

        box.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(box);
            }
        });
    });

    function toggle(box) {
        if (box.dataset.state === "disabled") return;

        const checked = box.getAttribute("aria-checked") === "true";
        box.setAttribute("aria-checked", String(!checked));
    }
});

