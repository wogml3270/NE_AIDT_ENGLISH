

$(function(){

		
	// wheelSet(대상, 최소값, 최대값, roop)
	function wheelTopLeftSet(_target, _min, _max, loop) {
		var scrollIntensity = _min
		var scrollMax = _max
		var loopEnabled = loop

		$(_target).hover(function () {
			$(document).on('mousewheel DOMMouseScroll', function (e) {
				var deltaY = e.originalEvent.deltaY
				updateScrollIntensity(deltaY)
				//console.log('Current Scroll Intensity:', scrollIntensity)
				$('.wheel').removeClass('on')
				$('.wheel.wheel-item' + scrollIntensity).addClass('on')
				//$('.wheel-item' + scrollIntensity).focus()

				// Optional: Prevent default scroll action
				// e.preventDefault();
			});
		}, function () {
			$(document).off('mousewheel DOMMouseScroll')
			scrollIntensity = _min // 마우스가 벗어날 때 스크롤 강도를 최소값으로 초기화
		});

		function stopWheel(e) {
			console.log('Scroll Disabled');
		}

		function updateScrollIntensity(deltaY) {
			if (deltaY > 0) {
				scrollIntensity = loopEnabled && scrollIntensity >= scrollMax ? _min : Math.min(scrollMax, scrollIntensity + 1);
			} else if (deltaY < 0) {
				scrollIntensity = loopEnabled && scrollIntensity <= _min ? scrollMax : Math.max(_min, scrollIntensity - 1);
			}

			// 최대값 또는 최소값 도달 시 로깅
			if (loopEnabled) {
				if (scrollIntensity === _min) {
					//console.log('스크롤 최소값 도달');
				} else if (scrollIntensity === scrollMax) {
					//console.log('스크롤 최대값 도달');
				}
			}
		}
	}

		// 함수 사용 예
		wheelTopLeftSet($(".navLeftTop"), 1, 5, true);


	/* $('input[type="text"]').on('click', function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).prop('checked', true).parent().siblings().find('input[type="radio"]').prop('checked', false);
	}); */

	// 버튼 클릭시 확대/축소 (teaching 클래스에 base 추가/제거)
	$('.b-t-large').on('click', function(){
		$('.teaching').removeClass('base');
		$(this).removeClass('on').siblings().addClass('on');
		$('.header.class').addClass('dn');
	});
	$('.b-t-small').on('click', function(){
		$('.teaching').addClass('base');
		$(this).removeClass('on').siblings().addClass('on');
		$('.header.class').removeClass('dn');
	});
	// toolbar
	let toolbarBtn = $('.toolbar button');

	$(toolbarBtn).on('click', function(){
		$(toolbarBtn).removeClass('active');
		$(this).toggleClass('active');
	});

	// 상단 레프트 메뉴
	$('.navLeftTop--opener').on('click', function(){
		$(this).toggleClass('on');
		$(this).hasClass('on') ? $(this).attr('aria-expanded', 'true') : $(this).attr('aria-expanded', 'false');
		$('.navLeftTop__set').toggleClass('on');
	});

	$('.navLeftTop__list--opener').on('click', function(){
		$(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'true' ? 'false' : 'true');
		$('.navLeftTop__wheelMenu a').removeClass('on');
		if($(this).attr('aria-expanded') === 'true'){

		}
	});

	$('.navLeftTop--closer').on('click', function(){
		let _target = $('.navLeftTop--opener');
		$(_target).toggleClass('on');
		$(_target).attr('aria-expanded', $(_target).attr('aria-expanded') === 'true' ? 'false' : 'true');
		$('.navLeftTop__set').toggleClass('on');
	});


	// 목차 메뉴
	$('.chapterList--opener').on('click', function(){
		$(this).toggleClass('on');
		
		$(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'true' ? 'false' : 'true');
	});

	$('.chapterList__set [aria-expanded]').on('mouseenter keyup', function(){
		$(this).attr('aria-expanded', 'true');
	})
	$('.chapterList__set [aria-expanded]').on('mouseleave', function(){
		$(this).attr('aria-expanded', 'false');
	})

	$('.unitSelect').on('mouseleave', function(){
		$('.chapterList--opener').attr('aria-expanded', 'false');
	})
	
	
	$('.unitSelect').on('focusout', function(e) {
		// 주메뉴 영역을 벗어났을 때
		setTimeout(function() {
			if (!$(document.activeElement).closest('.unitSelect').length) {
				$('.chapterList--opener').attr('aria-expanded', 'false');
			}
		}, 10);
	});

	$('.unitSelect li.on a').attr('title','선택됨');




	// lnb
	$('.lnb--closer').on('click', function(){
		$('.lnb').toggleClass('open');
	});

	$('.classSelect').on('mouseenter', function(){
		$(this).addClass('on');
	});
	$('.classSelect').on('mouseleave', function(){
		$(this).removeClass('on');
	});

	fileCustorm();

	$('#SUGGESTCHK').on('click', function(){
		$(this).prop('checked') ? $(this).parent().addClass('on') : $(this).parent().removeClass('on');
	});
})

function fileCustorm() {
	$(".file_custorm input[type=file]").on("change", function() { const fileName = $(this).val().split("\\").pop(); $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요."); });
}
