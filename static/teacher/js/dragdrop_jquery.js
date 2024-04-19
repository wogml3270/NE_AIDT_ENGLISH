$(function() {

		// 수업 계획서 탭 전환
		$('.left-bar__radiogroup input[type="radio"]').on('change', function() {
				$('.left-bar__radiogroup label').removeClass('on');
				$(this).parent('label').addClass('on');
				let tabIdx = $(this).parent().index();
				$('.lessonPlan__tabs').removeClass('on').eq(tabIdx).addClass('on');
		});

		
		$('.lessonlist input[type="radio"]').on('change', function() {
			$('.lessonMoveUp, .lessonMoveDown').remove();
			if ($(this).is(':checked')) {
					var $currentLi = $(this).closest('li');
					$currentLi.append('<button type="button" class="lessonMoveUp"><i class="blind">위로 이동</i></button>');
					$currentLi.append('<button type="button" class="lessonMoveDown"><i class="blind">아래로 이동</i></button>');
					// 이동 버튼 클릭 이벤트 핸들러 바인딩
					bindMoveButtons();
			}
		});

		// 추가 수업 자료 드래그 설정
    $('.lessonPlan__inner input[type="radio"], .lessonlist input[type="radio"]').on('change', function() {
        $('.lessonPlan__inner li, .lessonlist li').removeClass('draggable ui-draggable ui-draggable-handle');

        $(this).closest('li').addClass('draggable');
        if($(this).closest('.lessonPlan__inner').length) {
            dragAndDrop();
        } else {
            dragAndDropReset();
        }
    });

});


// 드래그앤드롭 기능 적용 함수
function dragAndDrop() {
	$('.lessonPlan__tabs .dragGroups>li').draggable({
		helper: 'clone',
		revert: 'invalid',
		handle: 'label'
	});

	$('.lessonBox__item li').droppable({
		accept: '.lessonPlan__tabs .dragGroups>li',
		drop: function(event, ui) {
			var $draggedItem = ui.draggable;
			// 드롭 시 플레이스홀더 위치에 드래그된 항목 배치
			$('.spaceholder').replaceWith($draggedItem);
			$draggedItem.fadeIn();
		},
		over: function(event, ui) {
			// 드래그 중 `<ul>` 내의 적절한 위치에 플레이스홀더 표시
			var $closestLi = $(document.elementFromPoint(event.clientX, event.clientY)).closest('li');
			if ($closestLi.length) {
				$('<li class="spaceholder"></li>').insertAfter($closestLi);
			} else {
				$('<li class="spaceholder"></li>').appendTo($(this).children('ul'));
			}
		},
		out: function(event, ui) {
			// 드래그 항목이 `<ul>` 밖으로 나가면 플레이스홀더 제거
			$('.spaceholder').remove();
		}
	});
}

function dragAndDropReset() {
	$('.lessonlist>li').draggable({
		helper: 'clone',
		handle: 'label'
	});

	$('.lessonPlan__tabs .dragGroups>li').droppable({
		accept: '.lessonlist>li',
		drop: function(event, ui) {
			var $draggedItem = ui.draggable;
			// 드롭 시 플레이스홀더 위치에 드래그된 항목 배치
			$('.spaceholder').replaceWith($draggedItem);
			$draggedItem.fadeIn();
		},
		over: function(event, ui) {
			// 드래그 중 `<ul>` 내의 적절한 위치에 플레이스홀더 표시
			var $closestLi = $(document.elementFromPoint(event.clientX, event.clientY)).closest('li');
			if ($closestLi.length) {
				$('<li class="spaceholder"></li>').insertAfter($closestLi);
			} else {
				$('<li class="spaceholder"></li>').appendTo($(this).children('ul'));
			}
		},
		out: function(event, ui) {
			// 드래그 항목이 `<ul>` 밖으로 나가면 플레이스홀더 제거
			$('.spaceholder').remove();
		}
	});
}
function bindMoveButtons() {
	// 위로 이동 버튼 클릭 이벤트
	$('.lessonMoveUp').click(function() {
			var $currentLi = $(this).closest('li');
			$currentLi.prev().before($currentLi);
			$('.lessonMoveUp').focus();
	});

	// 아래로 이동 버튼 클릭 이벤트
	$('.lessonMoveDown').click(function() {
		var $currentLi = $(this).closest('li');
		$currentLi.next().after($currentLi);
		$('.lessonMoveDown').focus();
	});
}


//
/* 


*/