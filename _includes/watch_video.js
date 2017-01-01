function watch(url) {
    $('#video-wrapper').fadeIn('fast');
    $('#video iframe').attr('src', url);
    $('#video').show();
}

function closeVideo() {
    $('#video iframe').attr('src', '');
    $('#video-wrapper').hide();
    $('#video').fadeOut('fast');
}