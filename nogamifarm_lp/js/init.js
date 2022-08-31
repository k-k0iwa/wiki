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
        const $body = document.body;
        const activeClass = 'is-active';
        const loadingClass = 'is-loading';

        if ($loadingArea.length <= 0) {
            return;
        }

        $loadingArea.classList.add(activeClass);
        $body.classList.add(loadingClass);

        setTimeout(() => {
            $hdgFv.classList.add(activeClass);
            $body.classList.remove(loadingClass);
        }, 8000);

        setTimeout(() => {
            $loadingArea.style.display = 'none';
        }, 8500);
    });
})();
