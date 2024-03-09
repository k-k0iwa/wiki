var ecblib = ecblib || {};
ecblib.customize = ecblib.customize || {};
ecblib.customize.user_sb = ecblib.customize.user_sb || {};

jQuery(function () {
    var _user_sb = ecblib.customize.user_sb;

    //-- トップページへ戻る初期値
    jQuery('#footer_pagetop').hide();

    //--- スムーススクロール
    jQuery('a[href^="#"]:not(".size-guide-item-link a")').click(function(){
        let speed = 500;
        let href= jQuery(this).attr("href");
        let target = jQuery(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top;
        jQuery("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
    var scrollpos;
    jQuery('#header_menu').click(function(){
        jQuery("#search_view").fadeOut(200);
        jQuery("#header_search").removeClass("active");
        jQuery('#search_view').removeClass('current');

        if (jQuery(this).hasClass('active')){
            jQuery('body').removeClass('body-fixed').css({'top': 0});
            window.scrollTo(0,scrollpos);
            jQuery("#menu_view").fadeOut(200);
            jQuery(this).removeClass("active");
            jQuery('#menu_view').removeClass('current');
        } else {
            scrollpos = jQuery(window).scrollTop();
            jQuery('body').addClass('body-fixed').css({'top': -scrollpos});
            jQuery("#menu_view").fadeIn(300);
            jQuery(this).addClass("active");
            jQuery('#menu_view').addClass('current');
        }
    });
    jQuery('#header_search').click(function(){
        jQuery("#menu_view").fadeOut(200);
        jQuery("#header_menu").removeClass("active");
        jQuery('#menu_view').removeClass('current');

        if (jQuery(this).hasClass('active')){
            jQuery('body').removeClass('body-fixed').css({'top': 0});
            window.scrollTo(0,scrollpos);
            jQuery("#search_view").fadeOut(200);
            jQuery(this).removeClass("active");
            jQuery('#search_view').removeClass('current');
        } else {
            scrollpos = jQuery(window).scrollTop();
            jQuery('body').addClass('body-fixed').css({'top': -scrollpos});
            jQuery("#search_view").fadeIn(300);
            jQuery(this).addClass("active");
            jQuery('#search_view').addClass('current');
        }
    });
    jQuery('#search_view .search_bg ,#search_view .block-header-search--close-button').click(function(){
        jQuery('body').removeClass('body-fixed').css({'top': 0});
        window.scrollTo(0,scrollpos);
        jQuery("#search_view").fadeOut(200);
        jQuery("#header_search").removeClass("active");
        jQuery('#search_view').removeClass('current');

        return false;
    });

    jQuery('#brand_header_menu').click(function(){
        jQuery("#search_view").fadeOut(200);
        jQuery("#brand_header_search").removeClass("active");
        jQuery('#search_view').removeClass('current');

        if (jQuery(this).hasClass('active')){
            jQuery('body').removeClass('body-fixed').css({'top': 0});
            window.scrollTo(0,scrollpos);
            jQuery("#menu_view").fadeOut(200);
            jQuery(this).removeClass("active");
            jQuery('#menu_view').removeClass('current');
        } else {
            scrollpos = jQuery(window).scrollTop();
            jQuery('body').addClass('body-fixed').css({'top': -scrollpos});
            jQuery("#menu_view").fadeIn(300);
            jQuery(this).addClass("active");
            jQuery('#menu_view').addClass('current');
        }
    });
    jQuery('#brand_header_search').click(function(){
        jQuery("#menu_view").fadeOut(200);
        jQuery("#brand_header_menu").removeClass("active");
        jQuery('#menu_view').removeClass('current');

        if (jQuery(this).hasClass('active')){
            jQuery('body').removeClass('body-fixed').css({'top': 0});
            window.scrollTo(0,scrollpos);
            jQuery("#search_view").fadeOut(200);
            jQuery(this).removeClass("active");
            jQuery('#search_view').removeClass('current');
        } else {
            scrollpos = jQuery(window).scrollTop();
            jQuery('body').addClass('body-fixed').css({'top': -scrollpos});
            jQuery("#search_view").fadeIn(300);
            jQuery(this).addClass("active");
            jQuery('#search_view').addClass('current');
        }
    });
    jQuery('#search_view .search_bg ,#search_view .block-header-search--close-button').click(function(){
        jQuery('body').removeClass('body-fixed').css({'top': 0});
        window.scrollTo(0,scrollpos);
        jQuery("#search_view").fadeOut(200);
        jQuery("#brand_header_search").removeClass("active");
        jQuery('#search_view').removeClass('current');

        return false;
    });

    jQuery("header form[name=frmSearch]").find(".block-header-search--submit").click(function(){
        location.href = jQuery(this).closest("form").attr("action")
        return false;
    })

    //ページャ省略
    jQuery('.pager .pagination.number').each(function() {
        if(jQuery(this).find('.pager-current').prevAll().length > 3) {
            jQuery(this).find('li.pager-current').prevAll().hide();
            jQuery(this).find('li.pager-current').prev().show();
            jQuery(this).find('li:first-of-type').show().addClass('omit-first');
        }
        if(jQuery(this).find('li.pager-current').nextAll().length > 3) {
            jQuery(this).find('li.pager-current').nextAll().hide();
            jQuery(this).find('li.pager-current').next().show();
            jQuery(this).find('li:last-of-type').show().addClass('omit-last');
        }
    });

    //日付入力制限
    jQuery(document).ready(function () {
        // 入力欄のセレクタを指定します
        var input = jQuery('.dateFormat');
        var prevLength = 0; // 前回の文字列の長さを格納する変数

        // input要素のinputイベントに対してイベントハンドラを設定します
        input.on('input change', function () {
            // 入力された文字列を取得します
            var text = input.val();

            // 文字列の長さが前回よりも大きい場合のみ処理を実行します
            if (text.length > prevLength) {
                // ここに文字入力時に実行したい処理を書きます
                let check_val = jQuery(this).val();
                if(!check_val.match(/^[0-9\/ ]+$/)){
                    jQuery(this).val(check_val.replace(/[^0-9]/g, ""));
                }
                let format_val = jQuery(this).val();
                let date_year_format = new RegExp(/^[0-9]{4}$/);
                let date_month_format = new RegExp(/^[0-9]{4} \/ [0-9]{2}$/);
                let date_month_text = new RegExp(/^[0-9]{6}$/);
                let date_full_text = new RegExp(/^[0-9]{8}$/);
                if(date_year_format.test(format_val) || date_month_format.test(format_val)) {
                    jQuery(this).val(format_val + " / ");
                }
                if(date_month_text.test(format_val)) {
                    jQuery(this).val(format_val.substr(0,4) + " / " + format_val.substr(4,2) + " / ");
                }
                if(date_full_text.test(format_val)) {
                    jQuery(this).val(format_val.substr(0,4) + " / " + format_val.substr(4,2) + " / " + format_val.substr(6,2));
                }
            }

            // 前回の文字列の長さを更新します
            prevLength = text.length;
        });
    });

    //お気に入り一覧 高さ合わせ
    jQuery(window).on("load", function() {
        setTimeout(function(){
            jQuery(".block-favorite--description").tile(2);
            jQuery(".block-favorite--cart-block").tile(2);
        },1000);
    });
    //カートモーダル
    jQuery('.block-goods-cart--modal-open-btn').on('click', function() {
        jQuery(this).closest('.block-goods-cart--modal-base').find('.block-goods-cart--modal').fadeIn('fast');
        return false;
    });
    jQuery('.block-goods-cart--modal-close, .block-goods-cart--modal-close-btn, .block-goods-cart--modal-bg').on('click', function() {
        jQuery(this).closest('.block-goods-cart--modal').fadeOut('fast');
        return false;
    });
});

jQuery(function($) {
    let $window = $(window),
        $searchFixed = $('.ss-search-fixed'),
        $footer = $('footer'),
        scrollTimeout;

    if($searchFixed.length) {
        $window.on('scroll resize', function() {
            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(function() {
                let scrollTop = $window.scrollTop(),
                    windowHeight = $window.height(),
                    documentHeight = $(document).height(),
                    footHeight = $footer.height();

                if (scrollTop > 120) {
                    $searchFixed.show();
                } else if (scrollTop < 80) {
                    $searchFixed.hide();
                }

                if (documentHeight - (scrollTop + windowHeight) <= footHeight) {
                    $searchFixed.css('opacity', '0.2');
                } else {
                    $searchFixed.css('opacity', '1');
                }
            }, 200); // 200ミリ秒の遅延を設定
        });
    }
});

// 商品一覧件数移動
jQuery(function(){
    jQuery('.block-category-list--header').after(jQuery('.block-goods-list-naviframe--top .pager-total'));
});

jQuery(function(){
    //ジェンダー絞り込み
    jQuery('.gender-tab-item').on('click',function(){
        jQuery("#sortForm").find("input[name=sex]").val(jQuery(this).attr("value"));
        ecblib.goods_search_modal_sb.RunFilter(jQuery("#sortForm"));
    });

    //価格絞り込み
    jQuery('.price-tab-item').on('click', function(){
        if(jQuery(this).attr("value") == "0") {
            jQuery("#sortForm").find("input[name=pricetype]").val("");
        } else {
            jQuery("#sortForm").find("input[name=pricetype]").val(jQuery(this).attr("value"));
        }
        ecblib.goods_search_modal_sb.RunFilter(jQuery("#sortForm"));
    });

    //カラーをまとめる
    jQuery('#colorChk').on('click', function(){
        var colorFlg = "";
        if (jQuery("#colorChk").is(':checked') == false) {
            colorFlg = "0";
        }
        jQuery("#sortForm").find("input[name=color_flg]").val(colorFlg);
        ecblib.goods_search_modal_sb.RunFilter(jQuery("#sortForm"));
    });

    //並び順
    jQuery('select[name=sort_field]').on('change', function(){
        jQuery("#sortForm").find("input[name=sort]").val(jQuery(this).find("option:selected").val());
        ecblib.goods_search_modal_sb.RunFilter(jQuery("#sortForm"));
    });
});

// 一覧タブ切り替え
jQuery(function(){
    jQuery('.tab-change-item').on('click',function(){
        jQuery(this).addClass('active');
        jQuery('.tab-change-item').not(this).removeClass('active');
    });
});
// 商品一覧・並び替え
/* ===== Logic for creating fake Select Boxes ===== */
jQuery(function(){
    jQuery('.sel').each(function() {
    jQuery(this).children('select').css('display', 'none');

    var $current = jQuery(this);

    jQuery(this).find('option').each(function(i) {
        if (i == 0) {
        $current.prepend(jQuery('<div>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box')
        }));

        var placeholder = jQuery(this).text();
        $current.prepend(jQuery('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
            text: placeholder,
            // 'data-placeholder': placeholder
        }));

        return;
        }

        $current.children('div').append(jQuery('<span>', {
        class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
        text: jQuery(this).text()
        }));
    });
    });
    if(jQuery('.block-goods-list--sort-order-items').hasClass('ranking')||jQuery('.block-goods-list--sort-order-items').hasClass('power-push')){
        var selectindex=jQuery('.block-goods-list--sort-order-items').find('option:selected').index();
        jQuery('.sel__box__options:nth-of-type('+selectindex+')').addClass('selected');
    }else{
        var selectindex=jQuery('.block-goods-list--sort-order-items').find('option:selected').index();
        jQuery('.sel__box__options:nth-of-type('+selectindex+')').addClass('selected');
    }

    let firstPlaceholder =jQuery('.sel__box__options:first-of-type').text();
    if(jQuery('.block-goods-list--sort-order-items').hasClass('ranking')){
        //ランキング・POWERPUSHは現在選択されたものにする
        jQuery('.sel__placeholder').text('種類：' +	jQuery('.block-goods-list--sort-order-items').find('option:selected').text());
    } else {
        jQuery('.sel__placeholder').text(jQuery('.block-goods-list--sort-order-items').find('option:selected').text());

    }

    // Toggling the `.active` state on the `.sel`.
    jQuery('.sel').click(function() {
    jQuery(this).toggleClass('active');
    });

    // Toggling the `.selected` state on the options.
    jQuery('.sel__box__options').click(function() {
    var txt = jQuery(this).text();
    var index = jQuery(this).index();

    jQuery(this).siblings('.sel__box__options').removeClass('selected');
    jQuery(this).addClass('selected');

    var $currentSel = jQuery(this).closest('.sel');
    if(jQuery('.block-ranking-r').length){

    }
    if(jQuery('.block-goods-list--sort-order-items').hasClass('ranking')){
        $currentSel.children('.sel__placeholder').text('種類：' + txt);
    } else {
        $currentSel.children('.sel__placeholder').text(txt);
    }
    // $currentSel.children('.sel__placeholder').text('並び替え：' + txt);
    $currentSel.children('select').prop('selectedIndex', index + 1);
    $currentSel.children('select').change();
    });
});


//レビュー一覧ページリダイレクト後の処理
jQuery(function() {
    if(document.URL.match(/goodsreviewlist/)){
        var url = window.location.href;
        var queryString = url.split("?")[1];
        var params = queryString.split("&");

        for (var i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            var paramName = param[0];
            var paramValue = decodeURIComponent(param[1]);

            if (paramValue === "created_at") {
                // s=created_atの場合の処理
                jQuery('.sel__placeholder').text('並び替え：新しい順');
                jQuery('.block-goods-list--sort-order-items-selectbox').prop('selectedIndex', 1);
                jQuery('.sel__box__options:nth-of-type(1)').addClass('selected');
                jQuery('.sel__box__options:not(:nth-of-type(1))').removeClass('selected');
            } else if (paramValue === "yes") {
                // s=yesの場合の処理
                jQuery('.sel__placeholder').text('並び替え：評価の高い順');
                jQuery('.block-goods-list--sort-order-items-selectbox').prop('selectedIndex', 2);
                jQuery('.sel__box__options:nth-of-type(2)').addClass('selected');
                jQuery('.sel__box__options:not(:nth-of-type(2))').removeClass('selected');
            } else if (paramValue === "yes_asc") {
                // s=yes_ascの場合の処理
                jQuery('.sel__placeholder').text('並び替え：評価の低い順');
                jQuery('.block-goods-list--sort-order-items-selectbox').prop('selectedIndex', 3);
                jQuery('.sel__box__options:nth-of-type(3)').addClass('selected');
                jQuery('.sel__box__options:not(:nth-of-type(3))').removeClass('selected');
            } else {
                ;  // 何もしない
            }
        }
    }
});

// 商品一覧絞り込み
jQuery(function () {
    //モーダル開く
    jQuery('.refine-search-btn,.sticky-refine-search-button,#condtionChange').on('click',function(e){
        e.preventDefault();
            jQuery('body').css('overflow', 'hidden');
            ecblib.goods_search_modal_sb.CreateEnableFilterList()
            jQuery('.refine-search-modal-wrapper').addClass('active');
            jQuery('.refine-search-modal-wrapper .refine-search-header,.refine-search-modal-wrapper .refine-search-footer-box').addClass('active');
            if(!jQuery('body').hasClass('page-review-list')){
                jQuery('.refine-search-modal-wrapper .refine-search-header .refine-search-header-text').text('商品を絞り込む');
            }
            if(jQuery('.block-ranking-r').length){
                jQuery('.refine-search-modal-wrapper .refine-search-header .refine-search-header-text').text('条件を絞り込む');
            }
    });
    // モーダル閉じる
    jQuery('.refine-search-modal-close').on('click',function(){
        jQuery('body').css('overflow', '');
        if(jQuery('.refine-search-modal-wrapper').hasClass('active')){
            jQuery('.refine-search-modal-wrapper').removeClass('active');
            jQuery('.refine-search-modal-wrapper .refine-search-header,.refine-search-modal-wrapper .refine-search-footer-box').removeClass('active');
        }
    });
    // 絞り込みモーダル戻る
    jQuery(document).on("click", ".refine-search-modal-wrapper .refine-search-modal-back", function(){
        jQuery(this).closest('.refine-search-modal-wrapper').removeClass('active');
        jQuery(this).closest('.refine-search-header').removeClass('active');
        jQuery(this).parent().siblings('.refine-search-footer-box').removeClass('active');
    });
    //ジェンダー絞り込み
    jQuery('.refine-gender-item').on('click',function(){
        jQuery(this).addClass('active');
        jQuery('.refine-gender-item').not(this).removeClass('active');
    });
    //ラジオボタン絞り込み
    jQuery('.sort-tab-item,.sort-tab-item-double').on('click',function(){
        jQuery(this).addClass('active');
        jQuery(this).siblings('.sort-tab-item,.sort-tab-item-double').removeClass('active');
    });
    // イベント対象モーダル開く
    jQuery('.refine-event-box').on('click',function(){
        jQuery('.refine-event-modal,.refine-event-modal .refine-search-header,.refine-event-modal .refine-search-footer-box').addClass('active');
    });

    // 絞り込みモーダル戻る
    jQuery('.refine-search-modal-back').on('click',function(){
        jQuery(this).closest('.refine-slide-modal,.refine-second-slide-modal').removeClass('active');
        jQuery(this).closest('.refine-search-header').removeClass('active');
        jQuery(this).parent().siblings('.refine-search-footer-box').removeClass('active');
    });
    jQuery('.refine-search-modal-wrapper .refine-search-modal-close').on('click',function(){
        jQuery(this).siblings('.refine-search-modal-back').hide();
    });
});

// 検索画面
jQuery(function(){
    //モーダル開く
    jQuery('.block-header-fixed--search').on('click',function(e){
        e.preventDefault();
            jQuery('body').css('overflow', 'hidden');
            jQuery('.query-search-modal').addClass('active');
    });
    // 検索画面閉じる
    jQuery('.query-search-modal-close').on('click',function(){
        jQuery('body').css('overflow', '');
        jQuery('.query-search-modal').removeClass('active');
    });
    // ショップモーダル開く
    jQuery('.to-search-shop').on('click',function(){
        if(jQuery(".search-shop-modal").hasClass("modal_updated") == false) {
            var data = ecblib.goods_search_modal_sb.getSearchModalApi("mode=shop_modal&search_flg=true");
            jQuery(".search-shop-modal").html(data);
            jQuery(".search-shop-modal").addClass("modal_updated");
        }
        jQuery('.search-shop-modal,.search-shop-modal .refine-search-header,.search-shop-modal .refine-search-footer-box').addClass('active');
    });
    // ブランドモーダル開く
    jQuery('.to-search-brand').on('click',function(){
        if(jQuery(".search-brand-modal").hasClass("modal_updated") == false) {
            var data = ecblib.goods_search_modal_sb.getSearchModalApi("mode=brand_modal&search_flg=true");
            jQuery(".search-brand-modal").html(data);
            jQuery(".search-brand-modal").addClass("modal_updated");
        }
        jQuery('.search-brand-modal,.search-brand-modal .refine-search-header,.search-brand-modal .refine-search-footer-box').addClass('active');
    });
    // カテゴリモーダル開く
    jQuery('.to-search-category').on('click',function(){
        if(jQuery(".search-category-modal").hasClass("modal_updated") == false) {
            var data = ecblib.goods_search_modal_sb.getSearchModalApi("mode=category&search_flg=true");
            jQuery(".search-category-modal").html(data.first_category_list);
            jQuery(".search-category-second-modal .refine-category-list").html(data.second_category_list);
            jQuery(".search-category-second-modal .item-count").text(data.default_total + "件");
            jQuery(".search-category-second-modal .default_total").val(data.default_total);
            jQuery(".search-category-modal").addClass("modal_updated");
        }

        jQuery(".search-category-modal.refine-slide-modal .sort-box.categorysecond").each(function(){
            if(jQuery(".search-category-second-modal.refine-slide-modal .refine-category-list").find(".refine-check-box-item[parent-category=" + jQuery(this).attr("name") + "]").find("input[type=checkbox]:enabled").length == 0) {
                jQuery(this).addClass("disabled");
            }
        })

        jQuery('.search-category-modal,.search-category-modal .refine-search-header,.search-category-modal .refine-search-footer-box').addClass('active');
    });
    // イベント対象モーダル開く
    jQuery('.to-search-event').on('click',function(){
        if(jQuery("#SearchModal").hasClass("modal_updated") == false) {
            var data = ecblib.goods_search_modal_sb.getSearchModalApi("mode=base_modal");
            jQuery("#SearchModal").html(data);
            jQuery("#SearchModal").addClass("modal_updated");
        }
        jQuery('.search-event-modal,.search-event-modal .refine-search-header,.search-event-modal .refine-search-footer-box').addClass('active');
    });
    //詳細条件から探す（絞り込みモーダル開く）
    jQuery('.to-search-detail-cond').on('click',function(e){
        if(jQuery("#SearchModal").hasClass("modal_updated") == false) {
            var data = ecblib.goods_search_modal_sb.getSearchModalApi("mode=base_modal");
            jQuery("#SearchModal").html(data);
            jQuery("#SearchModal").addClass("modal_updated");
        }
		e.preventDefault();
		ecblib.goods_search_modal_sb.CreateEnableFilterList()
		jQuery('.refine-search-modal-wrapper').addClass('active');
		jQuery('.refine-search-modal-wrapper .refine-search-header,.refine-search-modal-wrapper .refine-search-footer-box').addClass('active');
		jQuery('.refine-search-modal-wrapper .refine-search-modal-back').show();
		jQuery('.refine-search-modal-wrapper .refine-search-header .refine-search-header-text').text('詳細条件から探す');

    });
	// 検索ボックス・入力したら
	jQuery('.query-keyword-input').on('input',function(){
		let input = jQuery(this).val(); //input に入力された文字を取得
		input = input.replace(/'/g, '’')
		if(input){
			//サジェストAjax実行
			jQuery.ajax({
				type: 'POST',
				url: ecblib.sys.wwwroot + "/search/searchmodalsuggestapi.aspx",
				cache: false,
				data: {
					input_keyword_api:input,
					limit:10
				},
				success: function (contents) {
					jQuery(".query-search-suggest-screen").html(contents);
					jQuery(".query-search-suggest-screen").show();
					jQuery('.query-modal-container').hide();
				},
				error: function() {
					jQuery(".query-search-suggest-screen").html("");
					jQuery(".query-search-suggest-screen").show();
					jQuery('.query-modal-container').hide();
				}
			});
		}else{
			jQuery(".query-search-suggest-screen").hide();
            jQuery('.query-modal-container').show();
		}
	});
	// 検索履歴削除
	jQuery(document).on('click','.search-history-delete',function(){
		　　　　　var $deleteword=jQuery(this);
				　　jQuery.when(
					　　　jQuery.ajax({
						　　　type: 'POST',
						　　　url: ecblib.sys.wwwroot + "/js/keywordhistorydelete.aspx",
						　　　cache: false,
						　　　data: {
							　　　　　deletekeyword:jQuery(this).parent().text()
						　　　},
					   　 success: function (data) {
					   　 }
						})
				  ).done(function() {
					$deleteword.parent('.search-history-item').fadeOut(500,function(){
						jQuery(this).remove();
						if(jQuery(".search-history-item").length==0){
							jQuery(".query-sub-header search-history").hide();
						}
					});
				  });
			});
    // 検索履歴が0件のとき検索履歴の見出し非表示
    jQuery('.search-history-list').on('DOMSubtreeModified propertychange', function() {
        // DOMが変更された時に動く処理
        if(jQuery('.search-history-item').length == 0){
            jQuery('.query-sub-header.search-history').hide();
        }else{
            jQuery('.query-sub-header.search-history').show();
        }
    });

    jQuery(".block-header-search--keyword-search-btn").click(function(){
        location.href = ecblib.cookie_params.GetCookieParamsAddUrl("/itemlist?query=" + jQuery(this).closest("form").find("input[name=query]").val().replace(/'/g, '’'), true);
    })

    jQuery("form[name=frmSearch]").find("input").keydown(function(e){
        if(e.keyCode === 13){
            location.href = ecblib.cookie_params.GetCookieParamsAddUrl(jQuery(this).closest("form").attr("action") + "?query=" + jQuery(this).val().replace(/'/g, '’'), true);
            return false;
        }
    })

    // 検索モーダル初期ちらつき防止
    jQuery(window).on('load',function(){
        jQuery('.query-search-modal').css('display','block');
    })



    //検索モーダル開く
    // jQuery(document).on('click','.header-detail-search-modal-trigger',function(e){
    //     e.preventDefault();
    //         jQuery('body').css('overflow', 'hidden');
    //         jQuery('.query-search-modal').addClass('active');
    //         jQuery('.block-header-search--keyword').blur();
    // });


    // ここから追記
    jQuery(document).on('click', '.header-detail-search-modal-trigger', function (e) {
        e.preventDefault();
        jQuery('body').css('overflow', 'hidden');
        jQuery('.query-search-modal').addClass('active');
        jQuery('.block-header-search--keyword').blur();

        jQuery('.query-keyword-input').focus();
    });

//     var isiPhone = /(iPhone|iPod)/.test(navigator.userAgent);
//     // visualViewportのresizeイベントをリッスン
//     visualViewport.addEventListener("resize", function () {
//         // キーボードの高さを計算
//         const keyboardHeight = window.innerHeight - visualViewport.height;

//         // .query-search-modal に .active が付与されており、iPhoneの場合のみ top の値を設定
//         if (isiPhone && jQuery('.query-search-modal').hasClass('active')) {
//             jQuery('.query-search-modal').css('top', -keyboardHeight + 'px');
//         }

// console.log('window.innerHeight:', window.innerHeight);
// console.log('visualViewport.height:', visualViewport.height);
// console.log('keyboardHeight:', keyboardHeight);
//     });

    function registerPushupEvent() {
        if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) return;

        visualViewport.addEventListener("resize", function () {
console.log('window.innerHeight', window.innerHeight);
console.log('visualViewport.height', visualViewport.height);
            if (jQuery('.query-search-modal').hasClass('active')) {
                const keyboardHeight = window.innerHeight - visualViewport.height;
console.log('keyboardHeight', keyboardHeight);
                const topValue = keyboardHeight === 0 ? "" : `${keyboardHeight}px`;
console.log('topValue', topValue);
console.log('EL', jQuery('.query-search-modal'));
                jQuery('.query-search-modal').css('top', topValue);
            }
        });
    }

    registerPushupEvent();
    //ここまで追記



    // 検索モーダル閉じる
    jQuery(document).on('click','.detail-search-modal--close',function(){
        jQuery('body').css('overflow', '');
        if(jQuery('.query-search-modal').hasClass('active')){
            jQuery('.query-search-modal').removeClass('active');
        }
    });

    //画像検索モーダル開く
    // jQuery(document).on('click','.block-header-search--camera',function(e){
    //     openImageSerachModal(e);
    // });
    // 画像検索モーダル閉じる
    jQuery(document).on('click','.img-search-modal--close',function(){
        closeImageSerachModal();
    });
});

// レビュー投稿
jQuery(function(){
    // レビュー星の画像切替
    setStars(jQuery('.block-user-review-star-item input:checked'));
    jQuery('.block-user-review-star-item input').on('change',function(){
        setStars(jQuery(this));
    });
    function setStars(checked){
        checked.parent('.block-user-review-star-item').addClass('active');
        checked.parent().prevAll('.block-user-review-star-item').addClass('active');
        checked.parent().nextAll('.block-user-review-star-item').removeClass('active');
    }
});

// レビュー履歴スライダー＆モーダル
window.addEventListener("DOMContentLoaded", () => {
	jQuery(function () {
		// 各要素に連番のIDを振る
		jQuery('.review-modal').each(function (index) {
			jQuery(this).attr('id', 'modal' + (index + 1));
		});
		jQuery('.user-review-modal-button').each(function (index) {
			var $this = jQuery(this);
			$this.addClass('modal-button' + (index + 1));
		});
		revieModal();
	});

	function revieModal(){


	// モーダルを開くボタンを取得する共通関数
	function getOpenModalButtons(modalIndex) {
	    return document.querySelectorAll(`.modal-button${modalIndex} .modalOpen`);
	}
	// モーダルを閉じるボタンを取得
    const closeModalBtns = document.querySelectorAll(".modalClose");

	// モーダルを表示する関数
	function openModal(modalId, initialSlide) {
	    const modal = document.getElementById(modalId);

	if (modal) {
		// モーダル内のSwiperを初期化
		const swiper = new Swiper(modal.querySelector(".modalInSlider"), {
            loop: true,
            navigation: {
			nextEl: modal.querySelector(".swiper-button-next"),
			prevEl: modal.querySelector(".swiper-button-prev"),
            },
            spaceBetween: 30, //任意のマージン
		  initialSlide: initialSlide, // スライド番号を指定
        });

		// モーダルを表示
		modal.classList.add("is-active");

		// モーダル内の閉じるボタンを取得
		const modalCloseBtns = modal.querySelectorAll(".modalClose");

		// モーダル内の閉じるボタンにクリックイベントを追加
		modalCloseBtns.forEach((modalCloseBtn) => {
		modalCloseBtn.addEventListener("click", () => {
			modal.classList.remove("is-active");
		});
		});
	}
	}

	// モーダルを開くボタンにクリックイベントを追加
	// .review-modalの要素の数を取得
	const reviewModals = document.querySelectorAll('.review-modal');
	const numberOfModals = reviewModals.length;

	// .review-modalの要素の数に応じてforループを設定
	for (let modalIndex = 0; modalIndex < numberOfModals; modalIndex++) {
	const openModalBtns = getOpenModalButtons(modalIndex + 1); // モーダルのインデックスは1から始まる場合
	console.log(modalIndex + 1); // モーダルのインデックス
	console.log(openModalBtns);
	    openModalBtns.forEach((openModalBtn, index) => {
            openModalBtn.addEventListener("click", () => {
		openModal(`modal${modalIndex + 1}`, index); // クリックしたボタンのインデックスをスライド番号として渡す
            });
        });
	}

	// モーダルを閉じるボタンにクリックイベントを追加
        closeModalBtns.forEach((closeModalBtn) => {
            closeModalBtn.addEventListener("click", () => {
		// 開いているモーダルをすべて閉じる
		const openModals = document.querySelectorAll(".modal.is-active");
		openModals.forEach((modal) => {
            modal.classList.remove("is-active");
            });
        });
	});

    }

});

// アイテムカテゴリーツリー
jQuery(function(){
    jQuery('.block-goods-item-category-tree-item').on('click',function(){
        if(!jQuery(this).hasClass('is-active')){
            jQuery(this).addClass('is-active');
            jQuery(this).parent().next('.block-goods-item-child-category-tree-list-wrapper').slideDown();
        } else {
            jQuery(this).removeClass('is-active');
            jQuery(this).parent().next('.block-goods-item-child-category-tree-list-wrapper').slideUp();
        }
    });
});

// タイプ切替え
window.addEventListener('DOMContentLoaded', () => {
    const categorySelector = document.getElementById('js-common-category-selector');

    if (categorySelector) {
        const men = categorySelector.querySelector('#men');
        const women = categorySelector.querySelector('#women');
        const life = categorySelector.querySelector('#life');
        const locationHref = window.location.href;
        const temp = locationHref.split('?')[1];
        const pram = new URLSearchParams('?'+ temp);
        const sexValueNum = pram.get('sex');
        const currentClass = 'is-current';
        const categorySelectorItems = categorySelector.querySelectorAll('li');

        categorySelectorItems.forEach(item => item.classList.remove(currentClass));

        if(sexValueNum == "men") {
            if(men != null) {
                men.classList.add(currentClass);
            }
        } else if (sexValueNum == "womens") {
            if(women != null) {
                women.classList.add(currentClass);
            }
        } else if (sexValueNum == "lifestyle") {
            if(life != null) {
                life.classList.add(currentClass);
            }
        }

        if(sexValueNum !== null) {
            const temp2 = locationHref.split('sex=' + sexValueNum);
            if(men != null) {
                men.onclick = () => { location.href = temp2[0]+'sex=men'+temp2[1].substring(0,temp2[1].length); };
            }
            if(women != null) {
                women.onclick = () => { location.href = temp2[0]+'sex=womens'+temp2[1].substring(0,temp2[1].length); };
            }
            if(life != null) {
                life.onclick = () => { location.href = temp2[0]+'sex=lifestyle'+temp2[1].substring(0,temp2[1].length); };
            }
        } else {
            const separator = locationHref.split('?').length > 1 ? '&&' : '?';
            if(men != null) {
                men.onclick = () => { location.href = locationHref + `${separator}sex=men`; };
            }
            if(women != null) {
                women.onclick = () => { location.href = locationHref + `${separator}sex=womens`; };
            }
            if(life != null) {
                life.onclick = () => { location.href = locationHref + `${separator}sex=lifestyle`; };
            }
        }
    }
});

// Daytona LIVE
jQuery(window).on('load', function () {
    const $liveLineUp = jQuery('#js-live-lineup');
    let playlistValue;

    if($liveLineUp.length) {
        jQuery('.js-live-lineup-change').on('click', function () {
            playlistValue = jQuery(this).data('playlist');
            if(playlistValue !== '') {
                $liveLineUp.attr('playlist', playlistValue);
            }
        });
    }
});

// visumo Modal内
window.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.querySelector('body');
    const observer = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const newClasses = mutation.target.classList;

                if (newClasses.contains('ecbn-selection-preview-overflow-hidden')) {
                    priceDisplayChange();
                }
            }
        }
    });

    observer.observe(bodyElement, { attributes: true });

    function priceDisplayChange() {
        let vsm_price_txt;
        let vsm_price;

        setTimeout(function() {
            const ecbnSelectionItems = document.querySelectorAll('#__inner_lightbox [class^=ecbn-selection-item-normalprice]');
            ecbnSelectionItems.forEach(function(item) {
                vsm_price_txt = item.textContent;
                vsm_price = vsm_price_txt.replace(/[^\d,]/g, '');
                item.innerHTML = vsm_price + '<span class="yen">\u5186</span>'; // 円
            });
        }, 500);
    }
});


//----ページャー省略処理
jQuery(function () {
    var currentPage = jQuery('.pager-current span').text();
    var totalPages = jQuery('.pagination-number li').length;

    if(totalPages > 5){
        // 5ページ目までは5ページ目までのリンクを表示し、それ以降は省略
        if (currentPage < 5) {
            jQuery('.pagination-number li').hide();
            jQuery('.pagination-number li:lt(5)').show();
            jQuery('.pagenation-number').addClass('pager-current-next');
            jQuery('.pagination-number li:nth-of-type(5)').addClass('pager-current-next');
            jQuery('.pagination-number li:first, .pagination-number li:last').show();
        } else if (currentPage > totalPages - 4) {
            jQuery('.pagination-number li').hide();
            jQuery('.pagination-number li:gt(' + (totalPages - 6) + ')').show();
            jQuery('.pagenation-number').addClass('pager-current-before');
            jQuery('.pagination-number li:nth-last-of-type(5)').addClass('pager-current-before');
            jQuery('.pagination-number li:first, .pagination-number li:last').show();
        } else {
            jQuery('.pagination-number li').hide();
            jQuery('.pager-current').show();
            jQuery('.pager-current').prev('li').show().addClass('pager-current-before');
            jQuery('.pager-current').next('li').show().addClass('pager-current-next');
            jQuery('.pagination-number li:first, .pagination-number li:last').show();
        }
    }


    if(currentPage == 1){
        // 新しい要素を作成
        var prevElement = jQuery('<li class="pager-previous disabled">' +
        '<a href="">' +
            '<div class="block-icon-image--center">' +
                '<div class="block-icon-image--center-inline-block">' +
                    '<div class="block-icon-image-page-navigation block-icon-image--prev"></div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '</li>');

        // 追加先の要素を取得して、新しい要素を追加
        jQuery('.pagination-number').prev('.pagination').append(prevElement);
    }
    if(currentPage == totalPages){
        // 新しい要素を作成
        var nextElement = jQuery('<li class="pager-next disabled">' +
        '<a rel="next" href="">' +
            '<div class="block-icon-image--center">' +
                '<div class="block-icon-image--center-inline-block">' +
                    '<div class="block-icon-image-page-navigation block-icon-image--next"></div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '</li>');



        // 追加先の要素を取得して、新しい要素を追加
        jQuery('.pagination-number').next('.pagination').append(nextElement);
    }
  });

// ハンバーガーメニュー・カテゴリ
jQuery(function(){
	jQuery('.block-menu-item').on('click',function(){
		jQuery(this).find('.block-menu-item-sublist-wrapper').addClass('is-active');
	});
	jQuery('.block-menu-sublist_link--back').on('click',function(e){
		e.stopPropagation();
		jQuery(this).parent('.block-menu-item-sublist-wrapper').removeClass('is-active');
	});
});


// 検索パラメータ反映
jQuery(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var keyword = urlParams.get('keyword');
    if (keyword) {
        jQuery('.block-header-search .block-header-search--keyword ').val(keyword);
    }
});

// 二段階認証エラー時
jQuery(function(){
    if(jQuery('.block-additional-authentication-input-error-input').length){
        jQuery('.block-additional-authentication--login').parent('.action').addClass('block-additional-authentication-submit-error');
        jQuery('.block-additional-authentication-input-error-input').on('input',function(){
                jQuery('.block-additional-authentication-submit-error').removeClass('block-additional-authentication-submit-error');
        });
    }
});

jQuery(window).on('load', function () {
    // ブックマーク：ゲスト時
    //jQuery('.invalid-guest-bookmark').on('click', function() {
    //    alert('ログイン後にご利用ください');
    //    return false;
    //});

    // この画像に似たアイテムを探す
    // jQuery('.block-goods-cart--modal-goods-similar-link').on('click', function(e){
    //     openImageSerachModal(e);
    // });
});

//画像検索モーダル開く
function openImageSerachModal(e){
    e.preventDefault();
    jQuery('.img-search-modal').addClass('active');
    jQuery('.img-search-modal .img-search--header').addClass('active');
}
// 画像検索モーダル閉じる
function closeImageSerachModal(){
    if (jQuery('.img-search-modal').hasClass('active')) {
        jQuery('.img-search-modal').removeClass('active');
        jQuery('.img-search-modal .img-search--header').removeClass('active');
    }
}

// 注文履歴タブ制御
jQuery(function () {
    const onlineOrderNum = jQuery('.online-order-count-value').val();
    const storeOrderNum = jQuery('.store-order-count-value').val();

    if (onlineOrderNum == 0 && storeOrderNum == 0) {
        // どちらも0件の場合
        jQuery('.storeorder_tab').addClass('not-allowed');

    } else if (storeOrderNum == 0) {
        // 店舗注文のみ0件の場合
        jQuery('.storeorder_tab').addClass('not-allowed');

    } else if (onlineOrderNum == 0) {
        // オンライン注文のみ0件の場合
        jQuery('.storeorder_tab').trigger('click');
        jQuery('.onlineorder_tab').addClass('not-allowed');

    }
});

// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", function(){ // jQueryが必要な処理
    let scrollPosition = 0; // 初期スクロール位置
    let scrollTimeout;
    jQuery(document).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if(jQuery("#menuside_modal").is(":hidden")){
                jQuery("#sideScrollTop").val(jQuery(document).scrollTop());
            }
        }, 200); // 200ミリ秒の遅延を設定
    });

    jQuery(document).on('click', '.footer-bottom-nav--menu', function (event) {
        event.preventDefault();
        scrollPosition = jQuery(window).scrollTop(); // 現在のスクロール位置を保存
        jQuery(".footer-bottom--nav").fadeOut();
        jQuery(".menuside_modal-bg").fadeIn();
        jQuery("#menuside_modal").addClass('is-active');
        jQuery('body').css('position','fixed').css({'top':-scrollPosition});
    });


    jQuery(document).on('click','.containerModal', function(event) {
        event.stopPropagation();
    });

    jQuery(document).on('click', '#menuside_modal', function(event) {
        jQuery(".block-footer-bottom").fadeIn();
        jQuery(".footer-bottom--nav").fadeIn();
        jQuery(".pane-main").fadeIn();
        jQuery(document).scrollTop(jQuery("#sideScrollTop").val());
        jQuery(".menuside_modal-bg").fadeOut();
        jQuery("#menuside_modal").removeClass('is-active');
        jQuery("ul[name='category']").removeClass('is-active');
        jQuery("span[name='category_link']").attr("status", "0");
        jQuery("ul[name='shop']").removeClass('is-active');
        jQuery("span[name='shop_link']").attr("status", "0");
        jQuery(".menu-primary__sublist").removeClass('is-active');
        jQuery(".menu-primary__subitem .menu-primary__label").attr("status", "0");
        jQuery('body').css('position','static').css({'top':0});
        jQuery(window).scrollTop(scrollPosition); // スクロール位置を元に戻す

    });
});

// 商品詳細・店舗在庫モーダル・取り置きリクエスト時・モーダル非表示
jQuery(function(){
    jQuery('body').on('click', '.block-goods-stock-request-btn', function () {
        jQuery('.modal-overlay').remove();
		jQuery('.modal-dialog').remove();
    });
});

//商品詳細・レビュー絞り込みを送信する
jQuery('.js-review--refine-search').on('click',function(){
    jQuery('body').css('overflow', '');
    let pos = jQuery('.tab-list.block-goods-description-tab-list').offset().top - 230;
    jQuery('body,html').animate({ scrollTop: pos }, 200, 'swing');
});

// LIVEページ・閲覧履歴非表示
jQuery(function(){
    if(jQuery('[channel="daytona_park"]').length){
        jQuery('.block-recommend-item-area').hide();
    }
});

// インスタグラムリスト表示
jQuery('.menu-sns-list--instagram').on('click', function() {
    if(!jQuery(this).hasClass('is-active')){
        jQuery(this).addClass('is-active');
        jQuery(this).find('.sns__item-sub').fadeIn();
    } else{
        jQuery(this).removeClass('is-active');
        jQuery(this).find('.sns__item-sub').fadeOut();
    }
});

// ヘッダーマイページアイコン・メニュー
jQuery('.block-headernav--mypage > a').on('click',function(e){
    e.preventDefault();
    if(!jQuery(this).parent('.block-headernav--mypage').hasClass('active')){
        jQuery('.block-headernav--mypage-menu-list').fadeIn();
        jQuery(this).parent('.block-headernav--mypage').addClass('active');
    } else {
        jQuery('.block-headernav--mypage-menu-list').fadeOut();
        jQuery(this).parent('.block-headernav--mypage').removeClass('active');
    }
});

// 購入履歴（一覧、詳細）・領収書モーダル
jQuery(function(){
    jQuery('.js-purchace-history-detail-receipt-btn').on('click',function(e){
        e.preventDefault();
        jQuery('.receipt-bg').fadeIn();
        jQuery('.block-purchase-history-detail--receipt-modal').fadeIn();
        jQuery('body').addClass('fixed');
    });

    jQuery('.js-purchace-history-list-receipt-btn').off("click"); // スムーススクロールのイベントキャンセル
    jQuery('.js-purchace-history-list-receipt-btn').on('click',function(e){
        e.preventDefault();
        SetReceiptModalData(jQuery(this).data());
        jQuery('.receipt-bg').fadeIn();
        jQuery('.block-purchase-history-detail--receipt-modal').fadeIn();
        jQuery('body').addClass('fixed');
        return false;
    });

    function SetReceiptModalData(data){
        jQuery('.js-purchase-history-list-receipt-message').hide();
        jQuery('.js-purchase-history-list-receipt-message').text('');
        if (data.message != ""){
            jQuery('.js-purchase-history-list-receipt-message').show();
            jQuery('.js-purchase-history-list-receipt-message').text(data.message);
        }
        jQuery('.js-input-receipt_address').val(data.receipt_address);
        jQuery('.js-input-receipt_address').removeClass('txt_input_bg_gray_');
        jQuery('.js-input-receipt_address').prop('disabled', true);
        if(data.receipt_address_enabled){
            jQuery('.js-input-receipt_address').addClass('txt_input_bg_gray_');
            jQuery('.js-input-receipt_address').prop('disabled', false);
        }
        jQuery('.js-input-receipt_proviso').val(data.receipt_proviso);
        jQuery('.js-input-receipt_proviso').removeClass('txt_input_bg_gray_');
        jQuery('.js-input-receipt_proviso').prop('disabled', true);
        if(data.receipt_proviso_enabled){
            jQuery('.js-input-receipt_proviso').addClass('txt_input_bg_gray_');
            jQuery('.js-input-receipt_proviso').prop('disabled', false);
        }
        jQuery('.js-receipt-modal-issue-button').attr('data-input', data.input);
        jQuery('.js-receipt-modal-issue-button').attr('data-order_id', data.order_id);
    }

    jQuery('.js-receipt-modal-close,.receipt-bg').on('click',function(){
        jQuery('.receipt-bg').fadeOut();
        jQuery('.block-purchase-history-detail--receipt-modal').fadeOut();
        jQuery('body').removeClass('fixed');
    });
});

// カート・ギフトラッピングモーダル
jQuery(function(){
	jQuery('.block-cart--detail-modal-open').on('click',function(){
		// iframe内のhead要素を取得
		const iframeHead = jQuery('.block-cart--gift-wrapping-modal iframe').contents().find('head');

		// styleタグを作成して追加
        const styleTag = jQuery('<style class="">#header,.unt-breadcrumb ,.pane-footer,.unt-helpdetail-accordion,#bedore-webagent-inner,.header-banner-block{display: none;}body{min-width: unset;}</style>');
		iframeHead.append(styleTag);
		setTimeout(function(){
			if(styleTag.length < 0)
			iframeHead.append(styleTag);
		},1000);
	});
});

// 商品一覧・検索モーダル・0件時処理
jQuery(document).ready(function() {
	// 初期のdata-count値を取得
	const initialCount = parseInt(jQuery("#total_count").attr("data-count"));

	// data-countの変化を監視
	const observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.attributeName === "data-count") {
		let newCount = parseInt(jQuery("#total_count").attr("data-count"));
		if (newCount === 0) {
			// data-countが0になった場合の処理をここに記述
			jQuery('#searchbutton').addClass('disabled');
		} else{
			jQuery('#searchbutton').removeClass('disabled');
		}
		}
	});
	});
        if(jQuery('#total_count').length){
	// MutationObserverを設定して監視を開始
	observer.observe(document.getElementById("total_count"), { attributes: true });
        }
});

// zeta・0件時処理
// MutationObserverのコールバック関数
function handleMutation(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // 子要素が変更された場合の処理
            jQuery(".js-zeta-container").each(function () {
                const $container = jQuery(this);
                const hasChildren = $container.find(".block-pickup-list-p--item, .block-ranking-r--goods, .block-ranking-r--item, .block-newitems-r--goods, .block-staffrecommend-r--goods").length > 0;

                if (hasChildren) {
                    $container.show(); // いずれかの子要素が含まれている場合、親要素を表示する
                } else {
                    $container.hide(); // どの子要素にも含まれていない場合、親要素を非表示にする
                }
            });
        }
    });
}

// MutationObserverの設定
const observer = new MutationObserver(handleMutation);

// 監視対象の要素を監視
const targetNode = document.body; // 監視対象の要素を適切に設定
const config = { childList: true, subtree: true };
observer.observe(targetNode, config);

// 注文内容確認・クーポンモーダル
// MutationObserverのコールバック関数
function handleCouponMutation(couponMutationsList, couponObserver) {
    for (let couponMutation of couponMutationsList) {
        if (couponMutation.type === 'childList' && couponMutation.target.classList.contains('block-order-estimate-coupon-error-text')) {
            if (couponMutation.target.textContent.trim() === '') {
                jQuery('.block-order-method--coupon-list .block-order-method--coupon-input input').removeClass('coupon-error');
            } else {
                jQuery('.block-order-method--coupon-list .block-order-method--coupon-input input').addClass('coupon-error');
            }
        }
    }
}

// 監視対象の要素を取得
const couponTargetNode = document.querySelector('.block-order-estimate-coupon-error-text');


if (couponTargetNode) {
// MutationObserverの設定
const couponObserverOptions = {
    childList: true, // 子ノードの変更を監視
};

// MutationObserverを作成し、監視を開始
const couponMutationObserver = new MutationObserver(handleCouponMutation);
couponMutationObserver.observe(couponTargetNode, couponObserverOptions);
}

// チャットボット起動用
function openChatbot() {
	document.querySelector('#bedore-webagent-inner').contentWindow.postMessage({
		type: 'bedore-webagent/toggle-webagent',
		body: { opened: true } // optional (無指定の場合は`true <-> false`)
	}, '*')
}

// ハンバーガーメニュー・pickupタイトル・非表示
jQuery(function(){
    if(!jQuery('.menu-pickup-item').length){
        jQuery('.menu-pickup-header').hide();
    }
});

jQuery(function(){
    jQuery('#staff-reviewtab').on('click',function(){
        if(!jQuery('.staffreview-item--review-param').length){
            jQuery('.staffreview-review--averages').hide();
        }
    });
});

// visumo viewallリンク先設定
jQuery(window).on('load',function(){
    // 現在のURLを取得
    const currentURL = window.location.href;

    // 特定の文字列が含まれているかを確認
    if (currentURL.indexOf('freaks_store') !== -1) {
        // フリークスストア
        jQuery('.vsm-tile .top-btn-basic-link').attr('href', '/userstyling/?vsmsctag=FREAK’S+STORE&vsmsccollection=collection01');
    }else if (currentURL.indexOf('aresense') !== -1) {
        // アーセンス
        jQuery('.vsm-tile .top-btn-basic-link').attr('href', '/userstyling/?vsmsctag=Aresense&vsmsccollection=collection01');
    } else if (currentURL.indexOf('freada') !== -1) {
        // フリーダ
        jQuery('.vsm-tile .top-btn-basic-link').attr('href', '/userstyling/?vsmsctag=Freada&vsmsccollection=collection01');
    } else if (currentURL.indexOf('firsthand') !== -1) {
        // ファーストハンド
        jQuery('.vsm-tile .top-btn-basic-link').attr('href', '/userstyling/?vsmsctag=Firsthand&vsmsccollection=collection01');
    } else if (currentURL.indexOf('publux') !== -1) {
        // パブリュックス
        jQuery('.vsm-tile .top-btn-basic-link').attr('href', '/userstyling/?vsmsctag=PUBLUX&vsmsccollection=collection01');
    }
});

//ゲスト購入時の日付入力
jQuery(function(){
    	// 入力欄のセレクタを指定します
	var input = jQuery('.guestdateFormat');
	var prevLength = 0; // 前回の文字列の長さを格納する変数
    // input要素のinputイベントに対してイベントハンドラを設定します
	input.on('input change', function () {
		// 入力された文字列を取得します
		var text = input.val();

		// 文字列の長さが前回よりも大きい場合のみ処理を実行します
		if (text.length > prevLength) {
			// ここに文字入力時に実行したい処理を書きます
		let check_val = jQuery(this).val();
		if(!check_val.match(/^[0-9\/ ]+$/)){
			jQuery(this).val(check_val.replace(/[^0-9]/g, ""));
		}
		let format_val = jQuery(this).val();
		if(format_val.match(/^[0-9]{4}$/) || format_val.match(/^[0-9]{4} \/ [0-9]{2}$/)) {
			jQuery(this).val(format_val + " / ");
		}
		}

		// 前回の文字列の長さを更新します
		prevLength = text.length;
	});
});

window.lazySizesConfig = window.lazySizesConfig || {};
/* lazysizesの設定の変更はここから記述してください
・lazySizesConfig.expandは、大きな画像を早めに読み込み開始させたい場合などに使用してください
    正の値を指定すると読み込み開始スクロール位置が上に（早く）なります
    負の値を設定すると読み込み開始スクロール位置が下に（遅く）なります
※lazySizesConfig.expandを指定しない場合、画像の読み込み状況やブラウザのアイドリング状況に応じて動的に最適化されますが
    指定すると動的な最適化が無効になることに注意してください
*/


jQuery(document).on("click",".footer-bottom--nav a",function(){
    dataLayer.push({
        event: 'click_footer_navigation',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).text().trim()
    });
});

jQuery(document).on("click","a.block-footernav--application-link",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).find(".block-footernav--application-name").html()
    });
});


jQuery(document).on("click",".block-footernav--nav-list a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).find(".block-footernav--nav-text").html()
    });
});

jQuery(document).on("click",".block-footernav--link-list a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).html()
    });
});

jQuery(document).on("click",".block-footernav-sns--list .facebook a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  'facebook'
    });
});

jQuery(document).on("click",".block-footernav-sns--list .x a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  'x'
    });
});

jQuery(document).on("click",".menu-sns-list--instagram .sns__item-sub a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: jQuery(this).text(),
        event_category2: null,
        event_label:  'instagram'
    });
});

jQuery(document).on("click",".block-footernav-sns--list .line a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  'line'
    });
});

jQuery(document).on("click",".block-footernav-sns--list .youtube a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  'youtube'
    });
});

jQuery(document).on("click",".block-footernav-sns--list .tiktok a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  'tiktok'
    });
});

jQuery(document).on("click",".block-footer-bottom--nav a",function(){
    dataLayer.push({
        event: 'click_footer',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).text()
    });
});

jQuery(document).on("click",".header-banner-block a",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: '横帯バナー',
        event_category2: null,
        event_label:  jQuery(this).text()
    });
});

jQuery(document).on("click","#header .block-headernav--login",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  'ログイン'
    });
});

jQuery(document).on("click","#header .block-headernav--mypage",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  'マイページ'
    });
});

jQuery(document).on("click","#header .block-headernav--mypage-menu-list a",function(event){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).text()
    });
    event.stopPropagation()
});

jQuery(document).on("click","#header .block-header-logo a",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).find("img").attr("alt")
    });
});

jQuery(document).on("click","#header .block-headernav--infomation",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  'お知らせ'
    });
});

jQuery(document).on("click","#header .block-header-search",function(){
    dataLayer.push({
        event: 'click_header',
        event_category: null,
        event_category2: null,
        event_label:  jQuery(this).find("input").attr("title")
    });
});

jQuery(document).on("click",".top-main-slider-item",function(){
    dataLayer.push({
        event: 'click_mainbanner',
        event_category: 'カルーセル',
        event_label: jQuery(this).find("img").attr("alt"),
        number: parseInt(jQuery(this).data("swiper-slide-index")) + 1
    });
});

jQuery(document).on("click",".top-main-slideup__item",function(){
    dataLayer.push({
        event: 'click_mainbanner',
        event_category: 'スライドアップ',
        event_label: jQuery(this).find("img").attr("alt"),
        number: parseInt(jQuery(this).data("order"))
    });
});

jQuery(document).on("click",".menu-primary__list.account .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'アカウント',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-pickup-block.pickup .menu-pickup-item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'PICK UP',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.item .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'アイテムを探す',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.contents .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'コンテンツ',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.store .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: '店舗・施設情報',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.help .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'ヘルプ・お問い合せ',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.com .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: '会社情報',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});

jQuery(document).on("click",".menu-primary__list.sns .menu-primary__item",function(){
    dataLayer.push({
        event: 'click_sidemenu',
        event_category: 'SNS',
        event_category2: jQuery(this).text(),
        event_label: null
    });
});


jQuery(document).on("click",".top-middle-banner-list-item",function(){
    dataLayer.push({
        event: 'click_middlebanner',
        event_label: jQuery(this).find("a").attr("title"),
        number: parseInt(jQuery(this).index()) + 1
    });
});

jQuery(document).on("click",".top-navi-item.shop",function(){
    dataLayer.push({
        event: 'click_middle_navigation',
        event_label: jQuery(this).find('.top-navi-link').text().trim(),
        event_category: 'スライドアップ'
    });
});

jQuery(document).on("click",".top-navi-item.new a",function(){
    dataLayer.push({
        event: 'click_middle_navigation',
        event_label: jQuery(this).text().trim(),
        event_category: 'スライドアップ'
    });
});

jQuery(document).on("click",".top-navi-item.sale a",function(){
    dataLayer.push({
        event: 'click_middle_navigation',
        event_label: jQuery(this).text().trim(),
        event_category: 'スライドアップ'
    });
});

jQuery(document).on("click",".top-navi-item.reserv a",function(){
    dataLayer.push({
        event: 'click_middle_navigation',
        event_label: jQuery(this).text().trim(),
        event_category: 'スライドアップ'
    });
});

jQuery(document).on("click",".top-navi-item.web a",function(){
    dataLayer.push({
        event: 'click_middle_navigation',
        event_label: jQuery(this).text().trim(),
        event_category: 'スライドアップ'
    });
});
jQuery(document).on("click",".check_list li a",function(){
    dataLayer.push({
        event: 'click_check_list',
        event_category: 'ITEM',
        event_label: jQuery(this).attr('title').trim(),
        number: parseInt(jQuery(this).parents('.block-ranking-r--item').index()) + 1
    });
});

jQuery(document).on("click",".check_list .top-btn-basic a",function(){
    dataLayer.push({
        event: 'click_check_list',
        event_category: 'VIEWALL',
        event_label: null,
        number: null
    });
});


jQuery(document).on("click",".main-slider-container .swiper-wrapper .swiper-slide",function(){
    dataLayer.push({
        event: 'click_item_image',
        number: parseInt(jQuery(this).data('swiper-slide-index')) + 1
    });
});

jQuery(document).on("click",".product-main-image .main-slider-container .swiper-button-next",function(){
    var num = parseInt(jQuery(".main-slider-container .swiper-wrapper .swiper-slide-active").data('swiper-slide-index'));
    if (num == 0) {num = 49};
    dataLayer.push({
        event: 'move_item_image',
        number: num,
        event_action: 'next'
    });
});

jQuery(document).on("click",".product-main-image .main-slider-container .swiper-button-prev",function(){
    var num = parseInt(jQuery(".main-slider-container .swiper-wrapper .swiper-slide-active").data('swiper-slide-index')) + 2;
    if (num == 50) {num = 1};
    dataLayer.push({
        event: 'move_item_image',
        number: num,
        event_action: 'prev'
    });
});