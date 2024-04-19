
// wheelSet(대상, 최소값, 최대값, roop)
function wheelMidSet(_target, _min, _max, loop) {
  var scrollIntensity = _min
  var scrollMax = _max
	var loopEnabled = loop

  $(_target).hover(function () {
    $(document).on('mousewheel DOMMouseScroll', function (e) {
      var deltaY = e.originalEvent.deltaY
      updateScrollIntensity(deltaY)
			//console.log('Current Scroll Intensity:', scrollIntensity)
			$('.landcard__side').removeClass('on')
			$('.landcard__side.type' + scrollIntensity).addClass('on')
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
wheelMidSet($(".middleLandWheel"), 1, 3, true);
