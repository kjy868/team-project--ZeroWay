gsap.registerPlugin(ScrollTrigger);

const path = document.querySelector("#effect__line");
const length = path.getTotalLength();

// 초기 설정: 전체 선을 숨기기
gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length
});

// 스크롤에 따라 선이 그려지는 애니메이션
gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        end: "bottom top",
        scrub: 1
    }
});