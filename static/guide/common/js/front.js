
function page_resize() {
	// iframe 리사이징
	$('#page_size').text($('#page_show').width() + ' x ' + $('#page_show').height());
}
$(document).ready(function () {
	$('#navigation').treeview({
		persist: 'cookie',
		cookieId: 'treeview-navigation',
		collapsed: false,
	});
	$('#navigation_m').treeview({
		persist: 'cookie',
		cookieId: 'treeview-navigation',
		collapsed: false,
	});

	if (mobile) {
		$('#bodyWrap').addClass('mobile');
		$('.iframe_wrap').addClass('portrait');
		$('#btn_mobile').addClass('on');
	} else {
		$('#btn_desktop').addClass('on');
	}

	$("#urls a[href='']").click(function (e) {
		e.preventDefault();
	});
	$("#urls_m a[href='']").click(function (e) {
		e.preventDefault();
	});
	$('#btn_reload').children().addClass('fa-spin');

	$('#urls a').each(function () {
		if (!$(this).attr('href') == '') {
			$(this).addClass('haslink');
		} else {
			$(this).addClass('nolink');
		}
	});
	$urls = $('#urls a.haslink');
	$urls.each(function () {
		var link = $(this).attr('href');
		var link_text = $(this).text();

		$('#side a.haslink').first().addClass('on');
		$(this).click(function (e) {
			const state = { page_id: 1, user_id: 5 };
			const title = '';
			var url = location.origin + location.pathname + '?current=' + $(this).attr('href');
			history.pushState(state, title, url);

			if ($(this).parent()[0].nodeName != 'DEL') {

				if (blank == true) {
					e.preventDefault();
					window.open($(this).attr('href'),"_blank")

				} else {
					e.preventDefault();
					$('#urls a').removeClass('on');
					$('#btn_reload').children().addClass('fa-spin');
					$(this).addClass('on');
					$('#page_show')
						.attr('src', link)
						.one('load', function () {
							$('#btn_reload').children().removeClass('fa-spin');
						});

					$('#page_url').val(link);

					$urls.removeClass('currentpage');
					$(this).addClass('currentpage');
				}
			}
			e.preventDefault();
		});
	});

	$('#urls_m a').each(function () {
		if (!$(this).attr('href') == '') {
			$(this).addClass('haslink');
		} else {
			$(this).addClass('nolink');
		}

	});
	$('#urls_m a.haslink').each(function () {
		var link = $(this).attr('href');
		var link_text = $(this).text();

		$('#side a.haslink').first().addClass('on');
		$(this).click(function (e) {
			e.preventDefault();
			$('#urls_m a').removeClass('on');
			$('#btn_reload').children().addClass('fa-spin');
			$(this).addClass('on');
			$('#page_show')
				.attr('src', link)
				.one('load', function () {
					$('#btn_reload').children().removeClass('fa-spin');
				});

			$('#page_url').val(link);
			//$('#page_url').val('/'+link);
			/*$('#page_title, #page_title3').text(link_text);*/
		});
	});

	var first_value = $('#urls a.haslink').first().attr('href');
	if (location.href.split('=')[1] != undefined) {
		first_value = location.href.split('=')[1];
		$('[href="' + first_value + '"]')
			.focus()
			.addClass('currentpage');
	} else {
		first_value = $('#urls a.haslink').first().attr('href');
		$('#urls a.haslink').first().focus().addClass('currentpage');
	}
	$('#page_title').text($('#urls a.haslink').first().text());
	$('#page_title').text($('#urls_m a.haslink').first().text());
	/*$('#page_title, #page_title2').text($('#urls a.haslink').first().text());
	$('#page_title, #page_title3').text($('#urls_m a.haslink').first().text());*/
	$('#page_leng').text(': 전체 ' + $('#urls li a.haslink').length + 'P / ');
	var percent = ($('#urls li.ok').length / $('#urls li a.haslink').length) * 100;
	$('#complete_leng').text('완료 ' + $('#urls li.ok').length + 'P / 진행율' + percent.toFixed(2) + '%');
	$('#page_leng_m').text(': 전체 ' + $('#urls_m li a').length + 'P / ');
	$('#complete_leng_m').text('완료 ' + $('#urls_m li.ok').length + 'P');

	$('#page_url').val(first_value);
	$('#page_url').click(function () {
		$(this).select();
	});
	$('#page_show')
		.attr('src', first_value)
		.one('load', function () {
			$('#btn_reload').children().removeClass('fa-spin');
		});

	// clickable
	$('.rotate').click(function () {
		if ($('.iframe_wrap').hasClass('portrait')) {
			$('.iframe_wrap').addClass('landscape').removeClass('portrait');
		} else if ($('.iframe_wrap').hasClass('landscape')) {
			$('.iframe_wrap').addClass('portrait').removeClass('landscape');
		}
	});
	$('#btn_external').click(function () {
		window.open($('#page_url').val());
	});
	$('#btn_reload').click(function () {
		$(this).children().addClass('fa-spin');
		$('#page_show')
			.attr('src', '.' + $('#page_url').val())
			.one('load', function () {
				$('#btn_reload').children().removeClass('fa-spin');
			});
	});
	$('#btn_mobile').click(function () {
		$(this).addClass('on');
		$('#btn_desktop').removeClass('on');
		$('body').addClass('mobile');
		$('.iframe_wrap').addClass('portrait');
	});
	$('#btn_desktop').click(function () {
		$(this).addClass('on');
		$('#btn_mobile').removeClass('on');
		$('body').removeClass('mobile');
		$('.iframe_wrap').removeClass('portrait landscape');
	});
});
$(window).on('load resize', function () {
	if (!$('#bodyWrap').hasClass('mobile')) {
		page_resize(); // 모바일인 경우 비활성화
	}
});
