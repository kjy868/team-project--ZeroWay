
// effect 애니메이션 ==========================
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
                trigger: ".merit",
                start: "top 90%",
                end: "bottom 250%",
                scrub: 0.5,
                markers: false
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 현재 보이는 line-path 찾기
    function getActivePath() {
        // 보이는 SVG의 path만 선택
        const visibleSvg = document.querySelector('.line-svg[style*="display: block"], #line-svg-desktop');
        return visibleSvg?.querySelector('#line-path');
    }

    // GSAP ScrollTrigger
    const linePath = getActivePath();
    if (linePath) {
        const len = linePath.getTotalLength();
        linePath.style.strokeDasharray = len;
        linePath.style.strokeDashoffset = len;

        gsap.to(linePath, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".merit",
                start: "top 90%",
                end: "bottom 250%",
                scrub: 0.5,
                markers: false
            }
        });
    }

    // resize 시 path 변경 처리
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();  // GSAP refresh
    });
});

// effect__merit 내부 path (세로 선)
const meritPath = document.querySelector('.merit__group svg path');
if (meritPath) {
    const len2 = meritPath.getTotalLength();
    meritPath.style.strokeDasharray = len2;
    meritPath.style.strokeDashoffset = len2;

    gsap.to(meritPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.merit__list02-wrap',
            start: 'top 30%',
            end: 'bottom 90%',
            scrub: 1
        }
    });
}

const circles = document.querySelectorAll('.merit__group svg circle');
circles.forEach((circle, index) => {
    const originalR = parseFloat(circle.getAttribute('r')) || 12;
    const smallR = Math.max(1, originalR * 0.7);

    // 초기 상태: 반지름 작게, 반투명
    circle.setAttribute('r', smallR);
    circle.style.opacity = 0.35;

    const itemTrigger = document.querySelector(`.merit__list02  li:nth-child(${index + 1})`) || document.querySelector('.merit__list02-wrap');

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


document.querySelectorAll('.effect__underline-path').forEach((pathEl) => {
    const len = pathEl.getTotalLength();

    // 초기 상태: 숨김
    gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });

    // 스크롤 시 그리기
    gsap.to(pathEl, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: pathEl.closest('.effect__item') || pathEl,
            start: 'top 80%',
            toggleActions: 'play none none none', // 한 번만 재생
            markers: false
        }
    });
});

// 밑줄효과 ==========================
document.querySelectorAll('.merit__list02 .line02 span').forEach((span) => {
    ScrollTrigger.create({
        trigger: span,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleClass: 'isActive',
        // toggleActions: 'play none none none',
        markers: false
    });
});

// zeromap 밑줄 그리기 효과 ==========================
const zeromapPath = document.querySelector('.zeromap__title svg path');
if (zeromapPath) {
    const len = zeromapPath.getTotalLength();
    zeromapPath.style.strokeDasharray = len;
    zeromapPath.style.strokeDashoffset = len;

    gsap.to(zeromapPath, {
        strokeDashoffset: 0,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: '.zeromap__title',
            start: 'top 60%',
            end: 'top 50%',
            scrub: 1,
            markers: false
        }
    });
}
