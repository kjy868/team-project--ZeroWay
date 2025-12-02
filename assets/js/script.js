
// effect 영역 svg 선 그려지는 애니메이션 ==========================
gsap.registerPlugin(ScrollTrigger);

// 1. Path 가져오기
const path = document.querySelector("#line-path");

// 2. 선의 전체 길이 구하기
const pathLength = path.getTotalLength();

// 3. 초기 상태(선 숨기기)
gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
});

// 4. 스크롤하면 선이 그려지는 애니메이션
gsap.to(path, {
    strokeDashoffset: 0, // 0이 되면 선이 완전히 나타남
    ease: "none",
    scrollTrigger: {
        trigger: ".effect",
        start: "top 50%",  // effect가 화면 맨 위에 닿을 때 시작
        end: "bottom 220%",  // effect가 화면 끝에서 사라질 때 끝
        scrub: 1,  // 부드럽게
        markers: false  // 디버깅 시 true로 변경
    }
});



// GSAP ScrollTrigger 애니메이션 ==========================
// ...existing code...
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // #line-path (기존 전체 선)
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
                start: "top 50%",
                end: "bottom 220%",
                scrub: 1,
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
                start: 'top center',
                end: 'bottom center',
                scrub: 0.8
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
// ...existing code...


