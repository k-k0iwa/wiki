'use strict';

((doc) => {
    let docElement = doc.documentElement;

    if (docElement && docElement.nodeType === 1) {
        docElement.setAttribute('data-script-enabled', 'true');
    }
    docElement = null;
})(window.document);

// Loading
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const $loadingArea = document.getElementById('js-loading');
        const $hdgFv = document.getElementById('js-fv');
        const $html = document.documentElement;
        const $body = document.body;
        const activeClass = 'is-active';
        const loadingClass = 'is-loading';
        const overlayClass = 'is-overlay';
        let scrollPosition;

        if ($loadingArea.length <= 0) {
            return;
        }

        $loadingArea.classList.add(activeClass);
        $body.classList.add(loadingClass);
        bodyFixedOn();

        setTimeout(() => {
            $hdgFv.classList.add(activeClass);
            $body.classList.remove(loadingClass);
            bodyFixedOff();
        }, 8000);

        setTimeout(() => {
            $loadingArea.style.display = 'none';
        }, 8500);

        //bodyのスクロール固定(iOS)
        function bodyFixedOn() {
            if (($body.classList.contains(overlayClass) || ($body.classList.contains(loadingClass)))) {
                scrollPosition = window.pageYOffset;
                $body.style.top = '-' + scrollPosition + 'px';
            }
        }

        //bodyのスクロール固定を解除(iOS)
        function bodyFixedOff() {
            if (($body.classList.contains(overlayClass) || ($body.classList.contains(loadingClass)))) {
                $body.style.top = '';
                window.scrollTo(0, scrollPosition);
            }
        }
    });
})();
