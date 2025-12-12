// ============================ about page ============================

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".benefit__count");
    let started = false;

    function countUp(element) {
        const target = Number(element.dataset.count);
        const unit = element.dataset.unit;
        let current = 0;

        const isFloat = String(target).includes(".");
        const duration = 2000;
        const frameRate = 16;
        const steps = duration / frameRate;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            element.textContent = isFloat
                ? current.toFixed(2) + unit
                : Math.floor(current).toLocaleString() + unit;
        }, frameRate);
    }

    function onScroll() {
        const benefit = document.querySelector(".benefit");
        const rect = benefit.getBoundingClientRect();

        if (!started && rect.top < window.innerHeight * 0.8) {
            counters.forEach(c => countUp(c));
            started = true;
        }
    }
    window.addEventListener("scroll", onScroll);
});
