$(function () {
    var initialIdx = 0;
    $('.action-panel').hide();
    const $firstPanel = $('.action-panel').eq(initialIdx).show();


    playTabFade($firstPanel[0]);
    gsap.from(".action__top", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
    });


    $('.action-tabs__btn').on('click', function () {
        var idx = $(this).index();
        var title = $(this).data('title');
        var notice = $(this).data('notice');


        $('.action-tabs__btn').removeClass('is-active');
        $(this).addClass('is-active');


        if (title) { $('.action__title').text(title); }
        if (notice) {
            $('.action__notice').text(notice).show();
        } else {
            $('.action__notice').hide();
        }

        gsap.fromTo(".action__title, .action__notice",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        const $targetPanel = $('.action-panel').hide().eq(idx);
        $targetPanel.show();

        playTabFade($targetPanel[0]);
    });
});

//GSAP 애니메이션

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


gsap.utils.toArray(".fade-up-section").forEach((section) => {
    gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
        }
    });
});

//  공통 애니메이션 함수

function playTabFade(panel) {
    if (!panel) return;

    const cards = panel.querySelectorAll(".tumbler__card, .campaign__card, .oneday__card");

    if (cards.length > 0) {

        gsap.killTweensOf(cards);

        gsap.fromTo(cards,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            }
        );
    }
}