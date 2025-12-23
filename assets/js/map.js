// 해시태그 복사 ==========================
const mapScroll = document.querySelector('.map__img-wrap');

window.addEventListener('load', () => {
    if (mapScroll) {
        mapScroll.scrollLeft = mapScroll.scrollWidth / 2;
    }

    // 이미지 높이에 맞춰 canvas, pin-img 높이 조정
    const mapCanvas = document.querySelector('.map__canvas');
    const mapImg = document.querySelector('.map__img img');
    const pinImg = document.querySelector('.pin-img');

    function setMapHeight() {
        if (mapImg && mapCanvas) {
            const imgHeight = mapImg.offsetHeight;
            if (imgHeight > 0) {
                mapCanvas.style.height = imgHeight + 'px';
                if (pinImg) {
                    pinImg.style.height = imgHeight + 'px';
                }
            }
        }
    }

    if (mapImg && mapImg.complete) {
        setMapHeight();
    } else if (mapImg) {
        mapImg.addEventListener('load', setMapHeight);
    }

    // 리사이즈 시에도 높이 재조정
    window.addEventListener('resize', setMapHeight);
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
gsap.registerPlugin(ScrollTrigger);

// 핀 꽂히는 애니메이션
gsap.from('.pin1, .pin2, .pin3, .pin4, .pin5, .pin6, .pin7, .pin8, .pin9, .pin10', {
    y: -60,
    scale: 0.3,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: 0.3,
    scrollTrigger: {
        trigger: '.map .pin-img',
        start: 'top 80%',
        once: true,
    }
});


// / 지도 가로 드래그 스크롤 기능 + 핀 클릭 분리 ======================
const tabMenu = document.querySelector('.map__img-wrap');
const header = document.querySelector('.header');

// header 영역인지 확인하는 함수
function isInHeaderArea(clientY) {
    if (!header) return false;
    const headerRect = header.getBoundingClientRect();
    return clientY < headerRect.bottom;
}

if (tabMenu) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let startScrollLeft;
    let didDrag = false;
    const DRAG_THRESHOLD = 6;

    tabMenu.addEventListener('mousedown', (e) => {
        // header 영역 클릭은 완전히 무시하고 이벤트 전파 차단
        if (isInHeaderArea(e.clientY)) {
            e.stopPropagation();
            e.preventDefault();
            isDown = false;
            return;
        }

        isDown = true;
        didDrag = false;
        tabMenu.style.cursor = 'grabbing';
        startX = e.pageX - tabMenu.offsetLeft;
        scrollLeft = tabMenu.scrollLeft;
        startScrollLeft = tabMenu.scrollLeft;
    }, false); // bubble phase에서 실행하여 header 이벤트가 먼저 처리되도록

    // document에서 mouseup 감지 (tabMenu 밖에서도)
    document.addEventListener('mouseup', () => {
        isDown = false;
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
        // header 영역에서는 드래그 무시
        if (isInHeaderArea(e.clientY)) {
            isDown = false;
            tabMenu.style.cursor = 'grab';
            return;
        }
        e.preventDefault();
        const x = e.pageX - tabMenu.offsetLeft;
        const walk = (x - startX);

        tabMenu.scrollLeft = scrollLeft - walk;

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
    tabMenu.addEventListener('click', (e) => {
        if (isInHeaderArea(e.clientY)) {
            e.stopPropagation();
            return;
        }
        hideAllBubbles();
        clearSelectedPins();
    });

    // 초기 커서 설정
    tabMenu.style.cursor = 'grab';
}


// 지도 더보기 버튼 ========================
// $(function () {
//     $('.map__more-btn').on('click', function () {
//         if ($(this).children().is('.open')) {
//             $(this).html('<p class="close">닫기</p>').addClass('close-btn');
//             $(this).parent().removeClass('slide-up').addClass('slide-down');
//         } else {
//             $(this).html('<p class="open">더보기+</p>').removeClass('close-btn');
//             $(this).parent().removeClass('slide-down').addClass('slide-up');
//         }
//     });
// });

$(function () {

    $('.map__more-btn').on('click', function (e) {
        e.preventDefault();
        const textWrap = $(this).parent();
        const isOpen = $(this).children().is('.open');

        if (isOpen) {
            // 더보기 → 닫기 (slide-down)
            $(this).html('<p class="close">닫기</p>').addClass('close-btn');
            textWrap.removeClass('slide-up').addClass('slide-down');
        } else {
            // 닫기 → 더보기 (slide-up)
            $(this).html('<p class="open">더보기+</p>').removeClass('close-btn');
            textWrap.removeClass('slide-down').addClass('slide-up');
        }
    });
});