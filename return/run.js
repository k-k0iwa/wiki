'use strict';

(function (win, doc, $) {
    if (!$) {return;}

    const $WIN = $(win);
    const $DOC = $(doc);
    const $BODY = $('body');
    const $HEADER = $('header');
    const UA = navigator.userAgent;
    const I_PHONE = UA.indexOf('iPhone') !== -1;
    const ANDROID = UA.indexOf('Android') !== -1 && UA.indexOf('Mobile') !== -1;
    const MOBILE = I_PHONE || ANDROID;
    const TABLET = UA.indexOf('iPad') > -1 || UA.indexOf('Android') > -1;
    const mqlPc = window.matchMedia('(min-width:769px)');
    const CURRENT_PAGE_URL = window.location.href;
    const HIDDEN_CLASS = 'is-hidden';
    const CURRENT_CLASS = 'is-current';
    let $this;

    /**
     * Temp
    **/
    // (function () {
    // }());

    /**
     * 特集一覧
    **/
    (function () {
        let createUri;

        // アーカイブid/for/data-uri付与
        const $featuresArchive = $('#js-features-archive');
        if ($featuresArchive.length) {
            let getUrl;

            $featuresArchive.find('.js-features-archive-item').each(function(i) {
                i = i + 1;
                $this = $(this);
                $this.find('[type="radio"]').attr('id', 'archive' + i);
                $this.find('label').attr('for', 'archive' + i);

                getUrl = $this.data('url');
                createUri = getUrl.substring(getUrl.indexOf('/date'));
                $this.attr('data-uri', createUri);
            });
        }

        // カテゴリから探すカレント表示/data-uri付与
        const $listCate = $('#js-list-cate');
        if ($listCate.length) {
            let cateLinkUrl;

            $listCate.find('.unt-list-cate-link').each(function(i) {
                $this = $(this);
                cateLinkUrl = $this.attr('href');

                if (CURRENT_PAGE_URL.includes(cateLinkUrl)) {
                    if (i > 0) {
                        $('.js-all').removeClass(CURRENT_CLASS);
                    }
                    $this.addClass(CURRENT_CLASS);
                } else {
                    $this.removeClass(CURRENT_CLASS);
                }

                createUri = cateLinkUrl.substring(cateLinkUrl.indexOf('/category'));
                $this.attr('data-uri', createUri);
            });
        }

        // 検索キーワード保持
        const $searchKeyword = $('#js-search-keyword');
        if ($searchKeyword.length) {
            let storedKeyword = localStorage.getItem($searchKeyword);
            if (storedKeyword) {
                $searchKeyword.val(storedKeyword);
            }
        }
        $('[name="genreForm"]').on('submit', function() {
            let inputKeyword = $searchKeyword.val();
            localStorage.setItem($searchKeyword, inputKeyword);
        });

        // スマホ用モーダルコンテンツ
        const $searchContents = $('.js-sp-search-contents');
        if ($searchContents.length) {
            // 複製
            $searchContents.append($('.js-sp-search-clone').clone(true));

            // 重複id/for/name対策
            let keepVal;
            let keepName;
            let $thisInput;

            $searchContents.find('#js-search-keyword').attr('id', 'js-search-keyword_clone');

            $searchContents.find('.unt-features-side-keywords').removeAttr('id');
            $searchContents.find('.unt-features-side-keywords-item').each(function() {
                $this = $(this);
                $thisInput = $this.find('input');
                keepVal = $thisInput.attr('id');
                keepName = $thisInput.attr('name');
                $thisInput.attr({
                    'id': keepVal + '_clone',
                    'name': keepName + '_clone'
                });
                $this.find('label').attr('for', keepVal + '_clone');
            });

            $searchContents.find('.unt-features-side-archive').removeAttr('id');
            $searchContents.find('.unt-features-side-archive-item').each(function() {
                $this = $(this);
                $thisInput = $this.find('input');
                keepVal = $thisInput.attr('id');
                keepName = $thisInput.attr('name');
                $thisInput.attr({
                    'id': keepVal + '_clone',
                    'name': keepName + '_clone'
                });
                $this.find('label').attr('for', keepVal + '_clone');
            });

            // 特集カテゴリから探す生成
            const $spCategory = $('\<div\>').addClass('unt-features-top-side js-sp-search-clone');
            const $spCategoryHdg = $('\<h2\>').addClass('unt-features-side-hdg').html('<span class="unt-fs-l">\u7279\u96C6\u30AB\u30C6\u30B4\u30EA</span>\u304B\u3089\u63A2\u3059'); // 特集カテゴリ / から探す
            const $spCategoryList = $('\<ul\>').addClass( 'unt-features-side-archive');
            let $spCategoryListItem;
            let $spCategoryListInput;
            let $spCategoryListLabel;
            let getHref;
            let getText;
            let setDataUri;

            $listCate.find('.unt-list-cate-link').each(function(i) {
                i = i + 1;
                $this = $(this);
                getHref = $this.attr('href');
                getText = $this.text();
                setDataUri = getHref.substring(getHref.lastIndexOf('/category'));
                $spCategoryListItem = $('\<li\>').attr({
                    'class': 'unt-features-side-archive-item',
                    'data-uri': setDataUri
                });
                $spCategoryListInput = $('\<input\>').attr({
                    type : 'radio',
                    'id': 'category' + i,
                    'name': 'feature_category',
                    'value': ''
                }).appendTo($spCategoryListItem);
                $spCategoryListLabel = $('\<label\>').attr({
                    'for': 'category' + i,
                    'class': 'unt-features-side-archive-label'
                }).text(getText).appendTo($spCategoryListItem);

                $spCategoryList.append($spCategoryListItem);
            });

            $spCategory.append($spCategoryHdg, $spCategoryList);
            $spCategory.insertBefore('.js-sp-search-contents .js-search-clone-archive');
        }

        // 絞り込みURL制御
        const $featuresSideKeywords = $('#js-features-side-keywords');
        if ($listCate.length || $featuresSideKeywords.length || $featuresArchive.length) {
            //
        }
    }());

    /**
     * 特集詳細
    **/
    (function () {
        const $buyerFeature = $('#js-buyer-feature');
        if ($buyerFeature.length) {
            const $relatedFeature = $('#js-related-feature');
            if($buyerFeature.find('li').length === 0) {
                $buyerFeature.closest('.unt-related-feature-block').addClass(HIDDEN_CLASS);

                $relatedFeature.find('[data-related-hide]').each(function() {
                    $this = $(this);
                    if($this.data('related-hide') !== '') {
                        $this.addClass(HIDDEN_CLASS);
                    }
                });
            } else {
                $relatedFeature.addClass(HIDDEN_CLASS);
            }
        }
    }());

    /**
     * YouTube Play
    **/
    (function () {
        const ytApiTag = $('\<script\>');

        ytApiTag.attr('src', 'https://www.youtube.com/iframe_api');
        $BODY.append(ytApiTag);

        function onPlayerReady(event) {
            event.target.mute();
            event.target.playVideo();
        }

        // ブロック内再生
        $('.js-movie').on('click', function (e) {
            e.preventDefault();

            $this = $(this);
            const intraBlockMovieId = $this.data('movie-id');
            const $intraBlockMovie = $('\<div\>').attr({
                'id': intraBlockMovieId,
                'class': 'temp-movie-frame'
            });
            const $intraBlockMovieTag = $('\<div\>').attr('class', 'temp-movie-wrap').append($intraBlockMovie);

            $this.append($intraBlockMovieTag).addClass('is-play');

            new YT.Player(intraBlockMovieId, {
                width: '100%',
                height: '100%',
                videoId: intraBlockMovieId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        });
    }());

    /**
     * Modal
    **/
    (function () {
        let $modalItem = $('[id^=js-modalItem]');
        let $modalItemLength = $modalItem.length;

        if ($modalItemLength <= 0) {
            return;
        }

        const MODAL_OPEN_CLASS = 'is-modalOpen';
        let $btnTrigger = $('[data-modal^=js-modalItem]');
        let $dataModal;
        let $dataModalName;
        let $targetModalItem;
        let $targetModalItemInner;
        let $modalOverlay;
        let $modalId;
        let winHeight;
        let targetHeight;
        let clientWidth;
        let noScrollbarWidth;
        let difference;

        $modalItem.each(function () {
            $(this)
            .attr({
                'role': 'dialog',
                'aria-modal': 'true'
            });
        });

        $modalOverlay = $('\<div\>').attr({
            'id': 'js-modalOverlay',
            'class': 'c-modalOverlay'
        });

        $btnTrigger.on('click', function (e) {
            e.preventDefault();

            $dataModal = $(this).data('modal');
            $dataModalName = '#' + $dataModal;
            $targetModalItem = $($dataModalName);
            $targetModalItemInner = $targetModalItem.find('.c-modal__inner');
            clientWidth = $BODY[0].clientWidth;

            $targetModalItemInner.attr('tabindex', 0);
            $targetModalItem.removeClass(HIDDEN_CLASS).wrap($modalOverlay);
            $BODY.addClass(MODAL_OPEN_CLASS);

            // 中身が多い時スクロールできるように
            winHeight = $WIN.height();
            targetHeight = $targetModalItem.outerHeight();
            if(targetHeight > winHeight*.8) {
                $targetModalItem.addClass('is-contentsOver');
            }

            // スクロールバーのズレ対策
            if(!MOBILE && !TABLET) {
                noScrollbarWidth = $BODY[0].clientWidth;
                difference = noScrollbarWidth - clientWidth;
                if (difference > 0) {
                    $BODY.css('padding-right', difference + 'px');

                    if(!mqlPc.matches) {
                        $HEADER.css('padding-right', difference + 'px');
                    }
                }
            }

            return false;
        });

        // close
        $DOC.on('click', '#js-modalOverlay, .js-btn-modalClose', function() {
            closeModal();
        });

        $DOC.on('click', '#js-modalContentsArea, [id^=js-modal]', function(e) {
            e.stopPropagation();
        });

        function closeModal() {
            $modalOverlay = $('#js-modalOverlay');
            $targetModalItem = $modalOverlay.find($modalItem);
            $targetModalItemInner = $targetModalItem.find('.c-modal__inner');
            $modalId = $targetModalItem.attr('id');

            $targetModalItemInner.attr('tabindex', -1);
            $targetModalItem.addClass(HIDDEN_CLASS).unwrap($modalOverlay);
            $BODY.removeClass(MODAL_OPEN_CLASS);
            $btnTrigger.each(function () {
                $this = $(this);
                $dataModal = $this.data('modal');
                if($dataModal === $modalId) {
                    $this.focus();
                }
            });
            resetFocusLoop();

            // スクロールバーのズレ対策
            if(!MOBILE && !TABLET) {
                $BODY.css('padding-right', '');

                if(!mqlPc.matches) {
                    $HEADER.css('padding-right', '');
                }
            }
        }

        // Key
        $DOC.on('keydown', function (e) {
            //27:Esc
            if(($BODY.hasClass(MODAL_OPEN_CLASS)) && (e.keyCode === 27)) {
                closeModal();
            }
        });
    }());
}(window, window.document, window.jQuery));


// 絞り込みURL制御サンプル
$(document).ready(function() {
    // #js-category a要素をクリックしたときの処理
    $('#js-category a').on('click', function(e) {
        const currentUrl = window.location.href;
        const dataUri = $(this).attr('data-uri');

        if (
            !currentUrl.includes('/category') ||
            currentUrl.includes('/hashtag') ||
            currentUrl.includes('/date') ||
            currentUrl.includes('?article_data_keyword_filter')
        ) {
            // 通常の遷移
            return;
        } else {
            // data-uri属性を含むURLに遷移し、ラジオボタンと検索キーワードをリセット
            e.preventDefault();
            const newUrl = currentUrl.replace('/category', dataUri);
            window.location.href = newUrl;
            $('input[name="feature_category"], input[name="feature_key_category"], input[name="feature_archive"]').prop('checked', false);
            $('#js-search-keyword').val('');
        }
    });

    // #js-category-another ラジオボタンをチェックしたときの処理
    $('#js-category-another input[type="radio"]').on('click', function() {
        const currentUrl = window.location.href;
        const dataUri = $(this).closest('li').attr('data-uri');

        if (
            !currentUrl.includes('/category') ||
            currentUrl.includes('/hashtag') ||
            currentUrl.includes('/date') ||
            currentUrl.includes('?article_data_keyword_filter')
        ) {
            // 親要素のdata-uri属性をURLに追加して遷移
            const newUrl = currentUrl + dataUri;
            window.location.href = newUrl;
            $('#js-hashtag input[type="radio"], #js-date input[type="radio"]').prop('checked', false);
            $('#js-search-keyword').val('');
        } else {
            // 通常の遷移
            return;
        }
    });

    // #js-search-keywordの検索ボタンをクリックしたときの処理
    $('[name="cmdArticleSearch"]').on('click', function(e) {
        const currentUrl = window.location.href;
        const keyword = $('#js-search-keyword').val();

        if (!currentUrl.includes('/category')) {
            // URLに?article_data_keyword_filterを追加して遷移
            e.preventDefault();
            const newUrl = currentUrl + '?article_data_keyword_filter=' + encodeURIComponent(keyword);
            window.location.href = newUrl;
            $('#js-hashtag input[type="radio"], #js-date input[type="radio"]').prop('checked', false);
        } else if (currentUrl.includes('?article_data_keyword_filter')) {
            // ?article_data_keyword_filterパラメータ値をkeywordに置き換えて遷移
            e.preventDefault();
            const regex = /(\?article_data_keyword_filter=)[^&]*/;
            const newUrl = currentUrl.replace(regex, '$1' + encodeURIComponent(keyword));
            window.location.href = newUrl;
            $('#js-hashtag input[type="radio"], #js-date input[type="radio"]').prop('checked', false);
        } else if (currentUrl.includes('/hashtag') || currentUrl.includes('/date')) {
            // URLの?article_data_keyword_filter以降を削除して遷移
            e.preventDefault();
            const regex = /\?article_data_keyword_filter=[^&]*/;
            const newUrl = currentUrl.replace(regex, '');
            window.location.href = newUrl;
            $('#js-hashtag input[type="radio"], #js-date input[type="radio"]').prop('checked', false);
        } else {
            // 通常の遷移
            return;
        }
    });

    // #js-hashtag ラジオボタンをクリックしたときの処理
    $('#js-hashtag input[type="radio"]').on('click', function() {
        const currentUrl = window.location.href;
        const dataUri = $(this).closest('li').attr('data-uri');

        if (
            !currentUrl.includes('/category') ||
            !currentUrl.includes('/hashtag') ||
            !currentUrl.includes('/date') ||
            !currentUrl.includes('?article_data_keyword_filter')
        ) {
            // 親要素のdata-uri属性をURLに追加して遷移
            const newUrl = currentUrl + dataUri;
            window.location.href = newUrl;
            $('#js-date input[type="radio"]').prop('checked', false);
        } else if (currentUrl.includes('/hashtag')) {
            // URLの/hashtag以降を親要素のdata-uri属性に置き換えて遷移
            const regex = /(\/hashtag)[^\/]*/;
            const newUrl = currentUrl.replace(regex, '$1' + dataUri);
            window.location.href = newUrl;
        } else if (currentUrl.includes('?article_data_keyword_filter') || currentUrl.includes('/date')) {
            // URLの/hashtag以降を削除して親要素のdata-uri属性を追加して遷移
            const regex = /(\/hashtag)[^\/]*|(\?article_data_keyword_filter=[^&]*)|(\/date[^\/]*)/;
            const newUrl = currentUrl.replace(regex, '') + dataUri;
            window.location.href = newUrl;
        } else {
            // 通常の遷移
            return;
        }
    });

    // #js-date ラジオボタンをクリックしたときの処理
    $('#js-date input[type="radio"]').on('click', function() {
        const currentUrl = window.location.href;
        const dataUri = $(this).closest('li').attr('data-uri');

        if (
            !currentUrl.includes('/category') ||
            !currentUrl.includes('/hashtag') ||
            !currentUrl.includes('/date') ||
            !currentUrl.includes('?article_data_keyword_filter')
        ) {
            // 親要素のdata-uri属性をURLに追加して遷移
            const newUrl = currentUrl + dataUri;
            window.location.href = newUrl;
            $('#js-hashtag input[type="radio"]').prop('checked', false);
        } else if (currentUrl.includes('/date')) {
            // URLの/date以降を親要素のdata-uri属性に置き換えて遷移
            const regex = /\/date[^\/]*/;
            const newUrl = currentUrl.replace(regex, dataUri);
            window.location.href = newUrl;
        } else if (currentUrl.includes('?article_data_keyword_filter') || currentUrl.includes('/hashtag')) {
            // URLの/date以降を削除して親要素のdata-uri属性を追加して遷移
            const regex = /\/date[^\/]*|(\?article_data_keyword_filter=[^&]*)|(#hashtag[^\/]*)/;
            const newUrl = currentUrl.replace(regex, '') + dataUri;
            window.location.href = newUrl;
        } else {
            // 通常の遷移
            return;
        }
    });
});


{/* <ul id="js-category">
  <li><a href="/features/category" data-uri="/category">すべて</a></li>
  <li><a href="/features/category/wear" data-uri="/category/wear">衣</a></li>
  <li><a href="/features/category/food" data-uri="/category/food">食</a></li>
</ul>

<ul id="js-category-another">
  <li data-uri="/category">
    <input type="radio" id="category1" name="feature_category" value="">
    <label for="category1" class="unt-features-side-archive-label">すべて</label>
  </li>
  <li data-uri="/category/wear">
    <input type="radio" id="category2" name="feature_category" value="">
    <label for="category2" class="unt-features-side-archive-label">衣</label></li>
  <li data-uri="/category/food">
    <input type="radio" id="category3" name="feature_category" value="">
    <label for="category3" class="unt-features-side-archive-label">食</label></li>
</ul>

<form action="/features" method="POST" name="genreForm">
  <div class="unt-features-side-search">
    <input type="text" id="js-search-keyword" maxlength="100" size="30" name="article_data_keyword_filter" value="" placeholder="検索キーワード">
    <input type="submit" name="cmdArticleSearch" value="検索">
  </div>
</form>

<ul id="js-hashtag">
  <li data-uri="/cook">
    <input type="radio" id="hashtag_cook" name="feature_key_category" value="">
    <label for="hashtag_cook" class="unt-features-side-keywords-label">#料理</label>
  </li>
  <li data-uri="/outdoor">
    <input type="radio" id="hashtag_outdoor" name="feature_key_category" value="">
    <label for="hashtag_outdoor" class="unt-features-side-keywords-label">#アウトドア</label>
  </li>
</ul>

<ul id="js-date">
  <li data-uri="/date/2023/07">
    <input type="radio" id="archive1" name="feature_archive" value="">
    <label for="archive1" class="unt-features-side-archive-label">2023年07月（<span class="num">9</span>）</label>
  </li>
  <li data-uri="/date/2023/06">
    <input type="radio" id="archive2" name="feature_archive" value="">
    <label for="archive2" class="unt-features-side-archive-label">2023年06月（<span class="num">1</span>）</label>
  </li>
  <li data-uri="/date">
    <input type="radio" id="archive0" name="feature_archive" value="">
    <label for="archive0" class="unt-features-side-archive-label">すべて</label>
  </li>
</ul> */}