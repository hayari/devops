// Tooltips Initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".post-content img").addClass("img-fluid wow fadeIn z-depth-1");
    $(".post-content img").attr("data-action","zoom");
    $("blockquote").addClass("blockquote bq-success");
    $('blockquote>p').replaceWith(function () {
        return $(this).contents();
    });

    // Animations initialization
    new WOW().init();

    // Figure Caption
    $('.tofigure').each(function () {
        $(this).replaceWith($('<figure class="figure tofigure">' + this.innerHTML + '</figure>'));
    });
    $('.tofigure').children('img').each(function () {
        var caption;
        caption = $(this).attr('title');
        $(this).after('<figcaption class="figure-caption">' + caption + '</figcaption>');
    });
});
