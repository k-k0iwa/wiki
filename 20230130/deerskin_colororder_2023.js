'use strict';

// Fix監視
window.addEventListener('DOMContentLoaded', function() {
    const fixedElem = document.getElementById('js-fixChecked');
    const targetObservation = document.getElementById('js-orderArea');
    const observationOptions = {
        root : null,
        rootMargin : '-50% 0px',
        threshold: 0
    };
    const mainObserver = new IntersectionObserver(observationCheck, observationOptions);
    const fixedClass = 'is-fixed';

    function observationCheck(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fixedElem.classList.add(fixedClass);
            } else {
                fixedElem.classList.remove(fixedClass);
            }
        });
    };
    mainObserver.observe(targetObservation);
});

// Slider
jQuery(function () {
    jQuery('[data-browse-mode="P"] #js-featureSlide').slick({
        slidesToShow: 1,
        autoplay: true,
        centerMode: true,
        variableWidth: true,
        arrows: false
    });
});

// Color Order
jQuery(function () {
    const $btnComplete = jQuery('.js-btnComplete');
    const $compImg = jQuery('#js-compImg');
    const $step1Radio = jQuery('[name="radio-heel"]');
    const $step2Radio = jQuery('[name="radio-width"]');
    const $step3Radio = jQuery('[name="radio-color"]');
    let step1Val;
    let step2Val;
    let step3Val;

    $btnComplete.prop('disabled', true);
    jQuery('[type="radio"]').prop('checked', false);
    $compImg.removeClass('is-comp');

    // jQuery(window).on('load', function () {
    //     jQuery('[type="radio"]').prop('checked', false);
    // });

    // STEP1
    // 追従にヒール高を反映
    // 追従にヒール高画像を反映
    $step1Radio.on('change', function () {
        step1Val = jQuery(this).val();
        jQuery('#js-checkHeel').text(jQuery(this).next().find('.stepOrder-step1List-ttl img').attr('alt'));
        jQuery('#js-checkHeelImg').attr('src', './img/usr/freepage/deerskin_colororder_2023/imgFixHeel_' + step1Val + '.jpg');
        check();
    });

    // STEP2
    // 追従に幅を反映
    // 追従に幅画像を反映
    // 完成画像に関係ない※URLに関係するか確認
    $step2Radio.on('change', function () {
        step2Val = jQuery(this).val();
        jQuery('#js-checkWidth').text(jQuery(this).next().find('.stepOrder-step2List-ttl img').attr('alt'));
        jQuery('#js-checkWidthImg').attr('src', './img/usr/freepage/deerskin_colororder_2023/imgFixWidth_' + step2Val + '.jpg');
        check();
    });

    // STEP3
    // 追従にカラーを反映
    // 追従にカラー画像を反映
    $step3Radio.on('change', function () {
        step3Val = jQuery(this).val();
        jQuery('#js-checkColor').text(jQuery(this).next().find('.stepOrder-step3List-ttl').text());
        jQuery('#js-checkColorImg').attr('src', jQuery(this).next().find('.stepOrder-step3List-img img').attr('src'));
        check();
    });

    function check() {
        if((step1Val !== undefined) && (step2Val !== undefined) && (step3Val !== undefined)) {
            $btnComplete.prop('disabled', false);
        }
    }

    // 完成イメージを見る
    jQuery('.js-btnComplete').on('click', function () {
        let userSelectImg = step1Val + step3Val;

        $compImg.find('img').attr('src', './img/usr/freepage/deerskin_colororder_2023/products/' + userSelectImg + '.jpg');
        $compImg.addClass('is-comp');
    });

});
