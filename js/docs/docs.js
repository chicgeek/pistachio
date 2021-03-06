(function(document) {
    var $h2 = document.querySelectorAll('h2.cd-title');
    var $pageNav = document.querySelector('.cd-page-nav');
    var i;

    if ($pageNav && $h2.length > 1) {
        $pageNav.className += ' cd-page-nav--show';

        for (var i = 0; i < $h2.length; i ++) {
            $h2[i].id = $h2[i].innerText.toLowerCase().replace(/ /g, '-');

            $pageNav.children[1].innerHTML += '<li><a href="#' + $h2[i].id + '">' + $h2[i].innerText + '</a></li>';
        }

        if ($('h1:first').length) {
            $('.cd-page-nav').insertAfter('h1:first');
        }
    }
}(document));
