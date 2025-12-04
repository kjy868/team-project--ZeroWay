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

// GSAP ScrollTrigger 애니메이션 ==========================
gsap.registerPlugin(ScrollTrigger);

// effect영역에서 선 그려지는 효과
document.addEventListener('DOMContentLoaded', () => {
    const linePath = document.querySelector("#line-path");
    if (linePath) {
        const len = linePath.getTotalLength();
        linePath.style.strokeDasharray = len;
        linePath.style.strokeDashoffset = len;

        gsap.to(linePath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".effect",
                start: "top 90%",
                end: "bottom 250%",
                scrub: 0.5,
                markers: false
            }
        });
    }

    // effect__merit 내부 path (세로 선)
    const meritPath = document.querySelector('.effect__merit svg path');
    if (meritPath) {
        const len2 = meritPath.getTotalLength();
        meritPath.style.strokeDasharray = len2;
        meritPath.style.strokeDashoffset = len2;

        gsap.to(meritPath, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.effect__merit-wrap',
                start: 'top 30%',
                end: 'bottom 90%',
                scrub: 1
            }
        });
    }

    const circles = document.querySelectorAll('.effect__merit svg circle');
    circles.forEach((circle, index) => {
        const originalR = parseFloat(circle.getAttribute('r')) || 12;
        const smallR = Math.max(1, originalR * 0.7);

        // 초기 상태: 반지름 작게, 반투명
        circle.setAttribute('r', smallR);
        circle.style.opacity = 0.35;

        const itemTrigger = document.querySelector(`.effect__merit-list li:nth-child(${index + 1})`) || document.querySelector('.effect__merit-wrap');

        gsap.to(circle, {
            attr: { r: originalR }, // r 속성만 키우면 위치는 변하지 않음
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: itemTrigger,
                start: 'top center',
                end: 'bottom center',
                scrub: true
            }
        });
    });
});

// effect-merit underline 선 그어지는 효과
// const underlinePath = document.querySelector('.underline-path');
// const pathLength = underlinePath.getTotalLength();

// gsap.set(underlinePath, {
//     strokeDasharray: pathLength,
//     strokeDashoffset: pathLength
// });

// gsap.to(underlinePath, {
//     strokeDashoffset: 0,
//     duration: 1,
//     ease: 'power1.inOut',
//     scrollTrigger: {
//         trigger: '.text-underline',
//         start: 'top 75%'
//     }
// });


