
// 함수 사용 예
wheelSet($(".hignLandWheel"), 1, 3, true);

$(function(){
	let wheeSet = $(".hignLandWheel");
	let wheelTarget = $(".hignLandWheel span.wheel");
	let wheelTargetLink = $(".hignLandWheel a.wheel");
	let wheelTargetIndex = 0;
	$(wheelTarget).on('mouseover keyup', function(e){
		e.preventDefault();
		wheelTargetIndex = $(this).parent().index() - 1;
		$(this).addClass('on').parent().siblings().find('span.wheel').removeClass('on');
		$(wheelTargetLink).eq(wheelTargetIndex).addClass('on').parent().siblings().find('a.wheel').removeClass('on');		
	});
	$(wheelTargetLink).on('mouseover keyup', function(e){
		e.preventDefault();
		wheelTargetIndex = $(this).parent().index();
		$(this).addClass('on').parent().siblings().find('a.wheel').removeClass('on');
		$(wheelTarget).eq(wheelTargetIndex).addClass('on').parent().siblings().find('span.wheel').removeClass('on');		
	});

})