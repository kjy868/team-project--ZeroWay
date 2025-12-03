

// GSAP ScrollTrigger 애니메이션 ==========================
gsap.registerPlugin(ScrollTrigger);

// #line-path (기존 전체 선)
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

    // circles: 위치는 고정하고 scale / opacity만 변경
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


