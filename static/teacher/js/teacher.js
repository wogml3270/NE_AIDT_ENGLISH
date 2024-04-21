

$(function(){
	// 툴바 토글 이동
	$('.t_b--tomove').on('click', function(){
		$('.main-header-top').toggleClass('tool-reverse');
	});

	// [aria-expanded] 값에 따라 토글
	$('.expandedSet [aria-expanded]').on('click', function(){
		var $this = $(this);
		var isExpanded = $this.attr('aria-expanded') === 'true';
		$this.attr('aria-expanded', !isExpanded);
	});

	// main FullScreen
	let indexFullScreen = $('.header__user__btns .btn--maximise');
	$(indexFullScreen).on('click', function(){
		$('.main-container').toggleClass('full-main');
		$('.sidebar').toggleClass('sidebar--hide');
	});

	// 목차 선택 토글
	let indexAsideLink = $('.index__content a');
	$(indexAsideLink).on('click', function(){
		$(indexAsideLink).removeClass('on');
		$(this).addClass('on');
	});
	
	$(indexAsideLink).focusout(function(){
		var tar = $(this).parents('.index');
		setTimeout(function(){
			if(tar.find('a:focus').length < 1){
				tar.removeClass('on');
				//tar.find('.index__content').slideUp(100);
				tar.find('.index--opener').attr('aria-expanded', false);
			}
		},100);
	});

	// sidebar 토글
	let indexAside = $('.sidebar--visible');
	$(indexAside).on('click', function(){
		$('.sidebar').toggleClass('sidebar--hide');
		$('.main-container').toggleClass('full-main');
	});


	// asideLeftRight 토글
	let indexAsideLinkLeft = $('.sidebar__button--leftFixed');
	let indexAsideLinkRight = $('.sidebar__button--rightFixed');
	$(indexAsideLinkLeft).on('click', function(){
		$('.main-container').toggleClass('reverse');
		$(this).addClass('dn');
		$(indexAsideLinkRight).removeClass('dn');
	});
	$(indexAsideLinkRight).on('click', function(){
		$('.main-container').toggleClass('reverse');
		$(this).addClass('dn');
		$(indexAsideLinkLeft).removeClass('dn');
	});

	fileCustorm();
})

function fileCustorm() {
	$(".file_custorm input[type=file]").on("change", function() { const fileName = $(this).val().split("\\").pop(); $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요."); });
}
