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

        // スマホ用モーダルコンテンツ
        const $searchContents = $('.js-sp-search-contents');
        if ($searchContents.length) {
            // 複製
            $searchContents.append($('.js-sp-search-clone').clone(true));

            // 重複id/for/name対策
            let keepVal;
            let keepName;
            let $thisInput;

            $searchContents.find('#js-search-keyword').attr('id', 'js-search-keyword_sp');
            $searchContents.find('[name="cmdArticleSearch"]').remove();

            $searchContents.find('.unt-features-side-keywords').removeAttr('id');
            $searchContents.find('.unt-features-side-keywords-item').each(function() {
                $this = $(this);
                $thisInput = $this.find('input');
                keepVal = $thisInput.attr('id');
                keepName = $thisInput.attr('name');
                $thisInput.attr({
                    'id': keepVal + '_sp',
                    'name': keepName + '_sp'
                });
                $this.find('label').attr('for', keepVal + '_sp');
            });

            $searchContents.find('.unt-features-side-archive').removeAttr('id');
            $searchContents.find('.unt-features-side-archive-item').each(function() {
                $this = $(this);
                $thisInput = $this.find('input');
                keepVal = $thisInput.attr('id');
                keepName = $thisInput.attr('name');
                $thisInput.attr({
                    'id': keepVal + '_sp',
                    'name': keepName + '_sp'
                });
                $this.find('label').attr('for', keepVal + '_sp');

                // 「すべて」不要
                if ($this.attr('data-uri') === '/date') {
                    $this.remove();
                }
            });

            // 特集カテゴリから探す生成
            const $spCategory = $('\<div\>').addClass('unt-features-top-side js-sp-search-clone');
            const $spCategoryHdg = $('\<h2\>').addClass('unt-features-side-hdg').html('<span class="unt-fs-l">\u7279\u96C6\u30AB\u30C6\u30B4\u30EA</span>\u304B\u3089\u63A2\u3059'); // 特集カテゴリ / から探す
            const $spCategoryList = $('\<ul\>').addClass( 'unt-features-side-archive js-sp-modal-cate');
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

                // 「すべて」不要
                if (setDataUri !== '/category') {
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
                }

                $spCategoryList.append($spCategoryListItem);
            });

            $spCategory.append($spCategoryHdg, $spCategoryList);
            $spCategory.insertBefore('.js-sp-search-contents .js-search-clone-archive');
        }

        // 絞り込みURL制御(PC)
        const $featuresSideKeywords = $('#js-features-side-keywords');
        if ($listCate.length || $featuresSideKeywords.length || $featuresArchive.length) {
            let pcModalDataUri;
            let pcModalRegex;
            let pcCreateUrl;

            // カテゴリから探す
            $listCate.find('.unt-list-cate-link').on('click', function(e) {
                pcModalDataUri = $(this).attr('data-uri');

                if (
                    !CURRENT_PAGE_URL.includes('/category') &&
                    (CURRENT_PAGE_URL.includes('/hashtag') || CURRENT_PAGE_URL.includes('/date') || CURRENT_PAGE_URL.includes('?article_data_keyword_filter'))
                ) {
                    // /hashtag or /date or ?article_data_keyword_filterが含まれているが/categoryが含まれていない場合、URL前に追加
                    e.preventDefault();
                    pcModalRegex = /(\/hashtag[^\/]*|\/date[^\/]*|\?article_data_keyword_filter=[^&]*)/;
                    const pcModalRegexMatch = CURRENT_PAGE_URL.match(pcModalRegex);
                    pcCreateUrl = CURRENT_PAGE_URL;

                    if (pcModalRegexMatch) {
                        pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegexMatch[1], pcModalDataUri + pcModalRegexMatch[1]);
                    } else {
                        pcCreateUrl = CURRENT_PAGE_URL + pcModalDataUri;
                    }
                    window.location.href = pcCreateUrl;
                } else if (
                    CURRENT_PAGE_URL.includes('/category') &&
                    (CURRENT_PAGE_URL.includes('/hashtag') || CURRENT_PAGE_URL.includes('/date') || CURRENT_PAGE_URL.includes('?article_data_keyword_filter'))
                ) {
                    // /categoryが含まれる 且つ /hashtag or /date or ?article_data_keyword_filterが含まれている場合、リセット
                    $('input[name="feature_category"], input[name="feature_key_category"], input[name="feature_archive"]').prop('checked', false);
                    $('#js-search-keyword').val('');
                    localStorage.removeItem('searchKeyword');
                    localStorage.removeItem('feature_key_category');
                    localStorage.removeItem('feature_archive');
                }
            });

            // キーワードから探す
            const $searchKeyword = $('#js-search-keyword');
            if ($searchKeyword.length) {
                let storedKeyword = localStorage.getItem('searchKeyword');
                if (storedKeyword) {
                    $searchKeyword.val(storedKeyword);
                }
            }

            $('[name="cmdArticleSearch"]').on('click', function(e) {
                const keyword = $('#js-search-keyword').val();

                // 保持
                let inputKeyword = $searchKeyword.val();
                localStorage.setItem('searchKeyword', inputKeyword);

                if (CURRENT_PAGE_URL.includes('?article_data_keyword_filter')) {
                    // ?article_data_keyword_filterがある場合、パラメータ値を書き換え
                    e.preventDefault();
                    pcModalRegex = /(\?article_data_keyword_filter=)[^&]*/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '$1' + encodeURIComponent(keyword));
                    window.location.href = pcCreateUrl;
                } else if (CURRENT_PAGE_URL.includes('/hashtag') || CURRENT_PAGE_URL.includes('/date')) {
                    // /hashtag or /dateがある場合、削除の上書き換え
                    e.preventDefault();
                    pcModalRegex = /(\/hashtag(\/[^\/]*)*|\/date(\/[^\/]*)*)/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '' + '?article_data_keyword_filter=' + encodeURIComponent(keyword));
                    window.location.href = pcCreateUrl;
                    $('input[name="feature_key_category"], input[name="feature_archive"]').prop('checked', false);
                } else {
                    e.preventDefault();
                    pcCreateUrl = CURRENT_PAGE_URL + '?article_data_keyword_filter=' + encodeURIComponent(keyword);
                    window.location.href = pcCreateUrl;
                }

                localStorage.removeItem('feature_key_category');
                localStorage.removeItem('feature_archive');
            });

            // 人気キーワードから探す
            if ($('#js-features-side-keywords').length) {
                let storedKeyword = localStorage.getItem('feature_key_category');
                $('#js-features-side-keywords [type="radio"]').each(function() {
                    if (storedKeyword && storedKeyword === $(this).attr('id')) {
                        $(this).prop('checked', true);
                    }
                });
            }

            $DOC.on('change', '#js-features-side-keywords [type="radio"]', function() {
                pcModalDataUri = $(this).closest('li').attr('data-uri');

                // 保持
                const checkedValue = $('input[name="feature_key_category"]:checked').attr('id');
                localStorage.setItem('feature_key_category', checkedValue);

                if (CURRENT_PAGE_URL.includes('/hashtag')) {
                    // 「/hashtag」がある場合、「/hashtag」以降のURLを書き換える
                    pcModalRegex = /(\/hashtag)(\/[^\/]*)*/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '$1' + pcModalDataUri);
                    window.location.href = pcCreateUrl;
                } else if (CURRENT_PAGE_URL.includes('/date') || CURRENT_PAGE_URL.includes('?article_data_keyword_filter')) {
                    // /categoryがある且つ/date or ?article_data_keyword_filterがある場合、削除の上書き換え、リセット
                    pcModalRegex = /(\/date(\/[^\/]*)*|\/hashtag(\/[^\/]*)*|\?article_data_keyword_filter=[^&]*)/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '') + '/hashtag' + pcModalDataUri;
                    window.location.href = pcCreateUrl;
                    $('input[name="feature_archive"]').prop('checked', false);
                    $('#js-search-keyword').val('');
                } else {
                    // /categoryがある場合 or 何も無い場合
                    pcCreateUrl = CURRENT_PAGE_URL + '/hashtag' + pcModalDataUri;
                    window.location.href = pcCreateUrl;
                }

                localStorage.removeItem('searchKeyword');
                localStorage.removeItem('feature_archive');
            });

            // アーカイブから探す
            if ($('#js-features-archive').length) {
                let storedKeyword = localStorage.getItem('feature_archive');
                $('#js-features-archive [type="radio"]').each(function() {
                    if (storedKeyword && storedKeyword === $(this).attr('id')) {
                        $(this).prop('checked', true);
                    }
                });
            }

            $DOC.on('change', '#js-features-archive [type="radio"]', function() {
                pcModalDataUri = $(this).closest('li').attr('data-uri');

                // 保持
                const checkedValue = $('input[name="feature_archive"]:checked').attr('id');
                localStorage.setItem('feature_archive', checkedValue);

                if (CURRENT_PAGE_URL.includes('/date')) {
                    // 「/date」がある場合、「/date」以降のURLを書き換える
                    pcModalRegex = /(\/date)(\/[^\/]*)*/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '' + pcModalDataUri);
                    window.location.href = pcCreateUrl;
                } else if (CURRENT_PAGE_URL.includes('/hashtag') || CURRENT_PAGE_URL.includes('?article_data_keyword_filter')) {
                    // /hashtag or ?article_data_keyword_filterがある場合、削除の上書き換え、リセット
                    pcModalRegex = /(\/hashtag(\/[^\/]*)*|\?article_data_keyword_filter=[^&]*)/;
                    pcCreateUrl = CURRENT_PAGE_URL.replace(pcModalRegex, '') + pcModalDataUri;
                    window.location.href = pcCreateUrl;
                    $('input[name="feature_key_category"]').prop('checked', false);
                    $('#js-search-keyword').val('');
                } else {
                    // /categoryがある場合 or 何も無い場合
                    pcCreateUrl = CURRENT_PAGE_URL + pcModalDataUri;
                    window.location.href = pcCreateUrl;
                }

                localStorage.removeItem('searchKeyword');
                localStorage.removeItem('feature_key_category');
            });
        }

        // 絞り込みURL制御(SP)
        let selectedCategory = '';
        // 特集カテゴリ（動的生成）のため
        $DOC.on('change', '.js-sp-modal-cate [type="radio"]', function() {
            selectedCategory = $(this).closest('li').data('uri');
        });

        $('#js-search-btn-submit').on('click', function() {
            let urlParams = [];

            // 特集カテゴリ値
            if (selectedCategory) {
                urlParams.push(selectedCategory);
            }

            // 人気キーワード値
            let popularKeyword = $('input[name="feature_key_category_sp"]:checked').closest('li').data('uri');
            if (popularKeyword) {
                urlParams.push('/hashtag' + popularKeyword);
            }

            // アーカイブ値
            let archive = $('input[name="feature_archive_sp"]:checked').closest('li').data('uri');
            if (archive) {
                urlParams.push(archive);
            }

            // 検索キーワード値
            let searchKeyword = $('#js-search-keyword_sp').val();
            if (searchKeyword) {
                urlParams.push('?article_data_keyword_filter=' + searchKeyword);
            }

            // URLの最後のディレクトリが「/features」ならそのまま値をURLに繋げる
            // ディレクトリに「/category」が含まれている場合、削除して値をURLに繋げる
            let featuresIndex = CURRENT_PAGE_URL.indexOf("/features");
            if (featuresIndex !== -1) {
                CURRENT_PAGE_URL = CURRENT_PAGE_URL.substring(0, featuresIndex + 9);
            }

            // 最終的なURLを組み立てる
            let finalURL = CURRENT_PAGE_URL + urlParams.join('');

            // 絞り込みを実行する
            // window.location.href = finalURL;
            console.log(finalURL);

            // 選択数
            console.log(urlParams.length);
        });

        $('#js-search-btn-reset').on('click', function() {
            $('#js-search-keyword_sp').val("");
            $('.js-sp-search-contents [type="radio"]').prop('checked', false);
        });
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
                        $this.remove();
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
