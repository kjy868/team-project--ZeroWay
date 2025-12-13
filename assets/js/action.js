
// 탭 메뉴 전환 효과
$(function () {

    $('.action-panel').hide().eq(0).show();

    $('.action-tabs__btn').on('click', function () {
        var idx = $(this).index();
        var title = $(this).data('title');
        var notice = $(this).data('notice');

        $('.action-tabs__btn').removeClass('is-active');
        $(this).addClass('is-active');

        $('.action-panel').hide().eq(idx).show();

        if (title) {
            $('.action__title').text(title);
        }

        if (notice) {
            $('.action__notice').text(notice).show();
        } else {
            $('.action__notice').text('').hide();
        }
    });

});
