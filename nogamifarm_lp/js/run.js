'use strict';

const $html = document.documentElement;
const $body = document.body;
const mqlTab = window.matchMedia('(min-width:768px)');
const overlayClass = 'is-overlay';
const loadingClass = 'is-loading';
const ua = navigator.userAgent;
const iosClass = 'type-ios';

if ((ua.indexOf('iPhone') !== -1) || (ua.indexOf('iPad') > -1)) {
    $html.classList.add(iosClass);
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});

// splide(plug-in)
(() => {
    setTimeout(() => {
        new Splide('.splide', {
            type : 'fade',
            rewind: true,
            speed: 4500,
            arrows: false,
            pagination: false,
            drag: false,
            autoplay: 'pause',
            interval: 7500,
            pauseOnHover: false,
            intersection: {
                inView: {
                    autoplay: true
                },
                outView: {
                    autoplay: false
                }
            }
        }).mount(window.splide.Extensions);
    }, 5000);
})();

// Menu
(() => {
    const $menuBtn = document.getElementById('js-gnav-btn');
    const $menuAncs = document.querySelectorAll('#js-gnav-menu .l-gnav-list__anc');
    const MenuOpenClass = 'is-MenuOpen';

    $menuBtn.addEventListener('click', () => {
        menuClose();
    });

    $menuAncs.forEach(menuAnc => {
        menuAnc.addEventListener('click', () => {
            menuClose();
            return false;
        });
    });

    function menuClose() {
        if ($body.classList.contains(overlayClass)) {
            $body.classList.remove(MenuOpenClass, overlayClass);
        } else {
            $body.classList.add(MenuOpenClass, overlayClass);
        }
    }
})();

// YouTube
(() => {
    const tag = document.createElement('script');
    const markScriptTag = document.getElementById('js-ybApiMark');
    const ybThumLinks = document.querySelectorAll('.js-yb');
    let player;
    let youTubeId;

    tag.src = "https://www.youtube.com/iframe_api";
    markScriptTag.parentNode.insertBefore(tag, markScriptTag);


    ybThumLinks.forEach(ybThumLink => {
        ybThumLink.addEventListener('click', (e) => {
            e.preventDefault();

            ybThumLink.parentNode.classList.add('is-active');
            youTubeId = ybThumLink.nextElementSibling.id;
            ybThumLink.remove();

            player = new YT.Player(youTubeId, {
                width: '640',
                height: '360',
                videoId: youTubeId,
                events: {
                    'onReady': onPlayerReady
                    }
            });
        });
    });

    function onPlayerReady(e) {
        e.target.playVideo();
        e.target.mute();
    }
})();

// Products Image Clone
(() => {
    const productsItems = document.querySelectorAll('.c-list-ph.u-pcHide .c-list-ph__item');
    const parentElem = document.getElementById('js-clone');
    let cloneElem;

    productsItems.forEach(function(productsItem) {
        cloneElem = productsItem.cloneNode(true);
        cloneElem.classList.add('u-spHide');
        cloneElem.querySelector('.js-lightbox-img').classList.add('is-clone');
        parentElem.appendChild(cloneElem);
    });
})();

// Lightbox
(() => {
    const lightboxWrapper = document.getElementById('js-lightbox');
    const lightboxImgTag = document.createElement('img');
    const lightboxCloseBtn = document.createElement('button');
    const showClass = 'is-show';
    let lightboxImages;
    let imgSrc;

    lightboxImgTag.className = 'c-lightbox__img';
    lightboxImgTag.setAttribute('alt', '');
    lightboxWrapper.appendChild(lightboxImgTag);
    lightboxCloseBtn.className = 'c-lightbox__btn';
    lightboxCloseBtn.setAttribute('type', 'button');
    lightboxCloseBtn.insertAdjacentText('afterbegin', 'close');
    lightboxWrapper.appendChild(lightboxCloseBtn);

    function mediaChange(mqlTab) {
        if(mqlTab.matches) {
            lightboxImages = document.querySelectorAll('.c-list-ph:not(.u-pcHide) .js-lightbox-img');
        } else {
            lightboxImages = document.querySelectorAll('.js-lightbox-img:not(.is-clone)');
        }

        lightboxImages.forEach( (lightboxImage, index) => {
            if (!lightboxImage.hasAttribute('data-num')) {
                lightboxImage.dataset.num = index;
            }

            lightboxImage.addEventListener('click', () => {
                lightboxWrapper.classList.add(showClass);
                $body.classList.add(overlayClass);
                imgSrc = lightboxImage.getAttribute('src');
                lightboxImgTag.src = imgSrc.replace(/_s\.(gif|jpg|jpeg|png)/, '_l.$1');
                baclLocked.open();
            });
        });
    }
    mqlTab.addEventListener('change', mediaChange);
    mediaChange(mqlTab);

    window.addEventListener('scroll', () => {
        offset = window.pageYOffset;
    });

    lightboxWrapper.addEventListener('click', () => {
        if (lightboxWrapper.classList.contains(showClass)) {
            lightboxClose();
            baclLocked.close();
        }
    });

    lightboxCloseBtn.addEventListener('click', () => {
        lightboxClose();
        baclLocked.close();
    });

    function lightboxClose() {
        lightboxWrapper.classList.remove(showClass);
        $body.classList.remove(overlayClass);
        lightboxImgTag.src = '';
    }

    // 背景固定
    let scrollStock = 0;
    let offset = 0
    const baclLocked = {
        open: () => {
          scrollStock = offset;
          $body.style.top = -scrollStock + "px";
        },
        close: () => {
          $body.style.top = "";
          window.scrollTo(0, scrollStock);
        }
    };
})();

// Scroll Animation
(() => {
    const aniTargets = document.querySelectorAll('.js-ani');
    const options = {
        root: null,
        rootMargin: '10px 0px',
        threshold: [0]
    };
    const observerTargets = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('is-aniActive');
                observer.unobserve(entry.target);
            }
        });
    }
    const fadeObserver = new IntersectionObserver(observerTargets, options);

    aniTargets.forEach(aniTarget => {
        fadeObserver.observe(aniTarget);
    });
})();

// Smooth Scroll
(() => {
    document.querySelectorAll('[href^="#anc-"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            let href = e.target.getAttribute('href');

            if(href === "#anc-top") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }

            return false;
        });
    });
})();
