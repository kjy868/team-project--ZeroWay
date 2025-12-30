
// merit 애니메이션 ==========================
// gsap.registerPlugin(ScrollTrigger);


// // merit영역에서 선 그려지는 효과
// document.addEventListener('DOMContentLoaded', () => {
//     const linePath = document.querySelector("#line-path");
//     if (linePath) {
//         const len = linePath.getTotalLength();
//         linePath.style.strokeDasharray = len;
//         linePath.style.strokeDashoffset = len;

//         gsap.to(linePath, {
//             strokeDashoffset: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: ".merit",
//                 start: "top 120%",
//                 end: "bottom 120%",
//                 scrub: 0.5,
//                 markers: false
//             }
//         });
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     // 현재 보이는 line-path 찾기
//     function getActivePath() {
//         // 보이는 SVG의 path만 선택
//         const visibleSvg = document.querySelector('.line-svg[style*="display: block"], #line-svg-desktop');
//         return visibleSvg?.querySelector('#line-path');
//     }

//     // GSAP ScrollTrigger
//     const linePath = getActivePath();
//     if (linePath) {
//         const len = linePath.getTotalLength();
//         linePath.style.strokeDasharray = len;
//         linePath.style.strokeDashoffset = len;

//         gsap.to(linePath, {
//             strokeDashoffset: 0,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: ".merit",
//                 start: "top 90%",
//                 end: "bottom 250%",
//                 scrub: 0.5,
//                 markers: false
//             }
//         });
//     }

//     // resize 시 path 변경 처리
//     window.addEventListener('resize', () => {
//         ScrollTrigger.refresh();  // GSAP refresh
//     });
// });

gsap.registerPlugin(ScrollTrigger);


// hero 영역 이미지 애니메이션 ==============
function initHeroAnimation() {
    const tl = gsap.timeline();

    tl.from(".hero__img01", {
        x: -160,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
        .from(".hero__img02", {
            x: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");
}

window.addEventListener("load", initHeroAnimation);


// fade up gsap 효과 ====================
function initFade() {
    gsap.utils.toArray(".fade-up").forEach(el => {

        gsap.set(el, { opacity: 0, y: 40 });

        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true
            }
        });
    });
}

window.addEventListener("load", initFade);

// merit merit 선 애니메이션 =====================
function setupMeritLine() {
    // ScrollTrigger.getAll().forEach(t => t.kill());

    let path;
    let svg;
    let circles = [];
    let reverse = false;

    if (window.matchMedia('(max-width: 480px)').matches) {
        path = document.querySelector('#line-svg-mobile path');
        svg = document.querySelector('#line-svg-mobile');
        circles = svg ? Array.from(svg.querySelectorAll('circle')) : [];
        reverse = false;
    } else if (window.matchMedia('(max-width: 1024px)').matches) {
        path = document.querySelector('#line-svg-tablet path');
        svg = document.querySelector('#line-svg-tablet');
        circles = svg ? Array.from(svg.querySelectorAll('circle')) : [];
        reverse = false;
    } else {
        path = document.querySelector('#line-path-desktop');
        reverse = false;
    }

    if (!path) return;

    const len = path.getTotalLength();

    // reverse 변수 없이 항상 같은 방식:
    gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: reverse ? 0 : len
    });

    // path 애니메이션
    const pathAnimation = gsap.to(path, {
        strokeDashoffset: reverse ? len : 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.merit',
            start: 'top 90%',
            end: 'bottom 250%',
            scrub: 0.5
        }
    });

    // circle 애니메이션 설정
    if (circles.length > 0 && svg) {
        const svgHeight = parseFloat(svg.getAttribute('height')) || 3000;
        
        // 각 circle을 y 좌표 순서대로 정렬 (위에서 아래로)
        circles.sort((a, b) => {
            return parseFloat(a.getAttribute('cy')) - parseFloat(b.getAttribute('cy'));
        });

        // 초기 상태 설정
        circles.forEach((circle) => {
            gsap.set(circle, {
                opacity: 0,
                scale: 0,
                transformOrigin: 'center center'
            });
        });

        // circle 등장 여부 추적용 Set
        const revealedCircles = new Set();
        
        // path 애니메이션과 동일한 ScrollTrigger 사용
        ScrollTrigger.create({
            trigger: '.merit',
            start: 'top 90%',
            end: 'bottom 250%',
            scrub: 0.5,
            onUpdate: (self) => {
                // pathAnimation의 ScrollTrigger progress 사용 (같은 trigger이므로 같은 progress)
                const pathProgress = self.progress; // 0~1 사이의 값
                
                circles.forEach((circle, index) => {
                    // 이미 나타난 circle은 스킵
                    if (revealedCircles.has(circle)) return;
                    
                    // circle의 y 위치를 SVG 높이 기준으로 progress 계산
                    const circleY = parseFloat(circle.getAttribute('cy')) || 0;
                    const circleProgress = circleY / svgHeight;
                    
                    // path 진행도가 circle 위치에 도달하면 나타남
                    // circleProgress를 낮춰서 더 일찍 나타나도록 조정
                    // 첫 번째 circle은 더 일찍 (0.6), 나머지는 점진적으로 (0.75, 0.8, 0.85, 0.9)
                    const threshold = index === 0 ? 0.8 : Math.min(0.75 + (index * 0.05), 0.95);
                    const triggerPoint = circleProgress * threshold;
                    
                    // path 진행도가 trigger point에 도달하면 나타남
                    if (pathProgress >= triggerPoint) {
                        revealedCircles.add(circle);
                        gsap.to(circle, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: 'back.out(1.7)'
                        });
                    }
                });
            },
            markers: false
        });
    }
}

// 최초 실행
window.addEventListener('load', () => {
    // fade up 애니메이션
    initFade();

    // merit 메인 선 애니메이션
    setupMeritLine();

    // merit list02 path (세로 선)
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
                start: 'top 65%',
                end: 'bottom bottom',
                scrub: 1
            }
        });
    }

    // merit list02 원형 애니메이션
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

    // merit list02 밑줄효과
    document.querySelectorAll('.merit__list02 .line02 span').forEach((span) => {
        ScrollTrigger.create({
            trigger: span,
            start: 'top 60%',
            end: 'bottom top',
            toggleClass: 'isActive',
            toggleActions: 'play none none none',
            markers: false
        });
    });

    // zeromap 하이라이트 그리기 효과
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
                scrub: 2,
                markers: false
            }
        });
    }
});


// 말풍선 핀 애니메이션
const images = document.querySelectorAll('.merit__img01, .merit__img02, .merit__img03, .merit__img04, .merit__img05');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            //observer.unobserve(entry.target); // 한 번만 재생
        }
    });
}, { threshold: 0.1 }); // 50% 보이면 트리거

images.forEach(img => observer.observe(img));

gsap.from('.merit__img01, .merit__img02, .merit__img03, .merit__img04, .merit__img05', {
    y: -60,
    scale: 0.3,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)', // 핀 꽂히는 튕김 느낌
    stagger: 0.15, // 순차 등장
    scrollTrigger: {
        trigger: '.merit__img',
        start: 'top 50%', // 뷰포트 80% 지점에서 시작
        end: 'top 50%',
        scrub: 0.5,
    }
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



