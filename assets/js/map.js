// 해시태그 복사 ==========================
const mapScroll = document.querySelector('.map__img-wrap');

window.addEventListener('load', () => {
    if (mapScroll) {
        mapScroll.scrollLeft = mapScroll.scrollWidth / 2;
    }
});

const copyBtn = document.getElementById("copyBtn");
const copyText = document.getElementById("copyText").innerText;

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(copyText);
        alert("해시태그가 복사됐습니다");
    } catch (err) {
        console.error(err);
    }
});

// 말풍선 핀 꽂히는 효과 애니메이션 =============================================

// GSAP ScrollTrigger 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// 핀 꽂히는 애니메이션
gsap.from('.pin1, .pin2, .pin3, .pin4, .pin5, .pin6, .pin7, .pin8, .pin9, .pin10', {
    y: -60,
    scale: 0.3,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)', // 핀 꽂히는 튕김 느낌
    stagger: 0.3, // 순차 등장 (0.15초 간격으로 하나씩)
    scrollTrigger: {
        trigger: '.map .pin-img',
        start: 'top 80%', // 뷰포트 80% 지점에서 시작
        once: true, // 한 번만 재생
    }
});


// / 지도 가로 드래그 스크롤 기능 + 핀 클릭 분리 ======================
const tabMenu = document.querySelector('.map__img-wrap');

if (tabMenu) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let startScrollLeft; // 클릭-드래그 판정 기준값
    let didDrag = false; // 드래그로 인한 클릭 방지 플래그
    const DRAG_THRESHOLD = 6; // px

    tabMenu.addEventListener('mousedown', (e) => {
        isDown = true;
        didDrag = false;
        tabMenu.style.cursor = 'grabbing';
        startX = e.pageX - tabMenu.offsetLeft;
        scrollLeft = tabMenu.scrollLeft;
        startScrollLeft = tabMenu.scrollLeft;
    });

    // document에서 mouseup 감지 (tabMenu 밖에서도)
    document.addEventListener('mouseup', () => {
        isDown = false;
        // didDrag는 다음 mousedown 때 초기화
        if (tabMenu) {
            tabMenu.style.cursor = 'grab';
        }
    });

    tabMenu.addEventListener('mouseleave', () => {
        isDown = false;
        tabMenu.style.cursor = 'grab';
    });

    tabMenu.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabMenu.offsetLeft;
        const walk = (x - startX);

        // 스크롤은 항상 실행
        tabMenu.scrollLeft = scrollLeft - walk;

        // 임계값은 클릭 판정용
        if (Math.abs(walk) > DRAG_THRESHOLD) {
            didDrag = true;
        }
    });



    // 핀 클릭 -> 말풍선 토글 ==============================
    const pins = tabMenu.querySelectorAll('.pin-img img[class^="pin"]');
    const bubbles = tabMenu.querySelectorAll('.pin-bubble');

    function hideAllBubbles() {
        bubbles.forEach(b => b.classList.remove('active'));
    }

    function clearSelectedPins() {
        pins.forEach(p => {
            p.classList.remove('is-selected');
            // GSAP로 스케일 복구 (inline transform 우선순위 문제 해결)
            gsap.to(p, { scale: 1, duration: 0.15, overwrite: 'auto' });
        });
    }

    pins.forEach((pin) => {
        pin.style.cursor = 'pointer';
        pin.addEventListener('click', (e) => {
            // 드래그 직후 발생한 클릭이면 무시 (스크롤 이동량으로 재확인)
            const moved = Math.abs(tabMenu.scrollLeft - startScrollLeft) > DRAG_THRESHOLD;
            if (didDrag || moved) return;
            e.stopPropagation();
            const match = Array.from(pin.classList).join(' ').match(/pin(\d{1,2})/);
            if (!match) return;
            const idx = match[1];
            const target = tabMenu.querySelector(`.pin-bubble.bubble${idx}`);
            if (!target) return;
            const willOpen = !target.classList.contains('active');
            hideAllBubbles();
            clearSelectedPins();
            if (willOpen) {
                target.classList.add('active');
                pin.classList.add('is-selected');
                // GSAP로 클릭 핀 확대
                gsap.to(pin, { scale: 1.1, duration: 0.15, transformOrigin: '50% 100%', overwrite: 'auto', ease: 'power2.out' });
            }
        });
    });

    // 빈 공간 클릭 시 모두 닫기
    tabMenu.addEventListener('click', () => {
        hideAllBubbles();
        clearSelectedPins();
    });

    // 초기 커서 설정
    tabMenu.style.cursor = 'grab';
}