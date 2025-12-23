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

    // fade up gsap
    gsap.registerPlugin(ScrollTrigger);

    const introTl = gsap.timeline();

    introTl
        .from(".fade-up-title", {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power2.out"
        })
        .from(".fade-up-desc", {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power2.out"
        }, "-=0.3");

    // 카드 fade-up 애니메이션 공통 함수
    function applyCardFadeUp(sectionSelector) {
        const cards = gsap.utils.toArray(`${sectionSelector} .fade-up-card`);
        if (cards.length > 0) {
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power3.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: sectionSelector,
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });
        }
    }
    [".effects", ".actions"].forEach(applyCardFadeUp);

    gsap.utils.toArray(".fade-up-section").forEach((section) => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                duration: 1.0,
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    });

    // circle text gsap
    gsap.utils.toArray(".circle-svg path").forEach((path) => {
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: path.closest("section"),
                start: "top 75%",
            }
        });
    });
});

