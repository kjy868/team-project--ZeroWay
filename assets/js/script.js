
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
        start: "top 90%",  // effect가 화면 맨 위에 닿을 때 시작
        end: "bottom 300%",  // effect가 화면 끝에서 사라질 때 끝
        scrub: 1,  // 부드럽게
        markers: false  // 디버깅 시 true로 변경
    }
});
