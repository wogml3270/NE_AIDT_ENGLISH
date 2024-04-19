$(function() {
	$('img').each(function(index, el) {
		// $(this).error(function() { // 3.0 에서 삭제됨.
		// 	console.log($(this),'error!!')
		// 	// $(this).replaceWith('<i class=errimg>');
		// 	$(this).attr('src','/static/bos/img/126X118.gif');
		// });
		// console.log($(this))
	});
	// var x = document.getElementsByTagName("img");
	// var i;
	// for (i = 0; i < x.length; i++) {
	//     x[i].onerror = function() {
	//     	this.src='/static/bos/img/126X118.gif'
	//     };
	// }
});
//dateTypeCheck
var date_regex = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
function dateTypeCheck(testDate){
	if(!(date_regex.test(testDate)))
	{
		return false;
	}else{
		return true
	}
}
function today(){
	var date = new Date();
	var year  = date.getFullYear();
	var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
	var day   = date.getDate();
	if (("" + month).length == 1) { month = "0" + month; }
	if (("" + day).length   == 1) { day   = "0" + day;   }
	return year+'-'+month+'-'+ day;
}
var dateValidatorTarget
var delay = 2;
var tuttimer = [];
function showtooltip(){
	clearTuttimer();
	tuttimer.push(setTimeout(function(){
		dateValidatorTarget.focus();
	},delay));
}
function clearTuttimer(){
	for (var i = 0; i < tuttimer.length; i++) {
		clearTimeout(tuttimer[i]);
	}
}
$(document).on('focusout','.sdate,.edate,.date',function(index, el) {
	if (!dateTypeCheck($(this).val()) && $(this).val()!="") {
		showtooltip();

		var title=$(this).attr('title')
		if ($(this)[0].id!='') {
			labelTitle=true;
		}else{labelTitle=false}
		if (title!=undefined) {
			alert(title+'형식이 올바르지 않습니다. 입력예 '+today());
		}else if(labelTitle){
			alert($('label[for='+$(this)[0].id+']').text()+'형식이 올바르지 않습니다. 입력예 '+today());
		}else{
			alert('날짜형식이 올바르지 않습니다. 입력예 '+today());
		}
		$(this).val('')
		dateValidatorTarget=$(this)
	}
});

// 팝업호출
function openPop(argument) {
	$('.js-pop, .b-pop').on('click',function(event) {
		event.preventDefault();
		// window.open(URL,name,specs,replace)
		var size = $(this).data().size.split(',')
		var scrollbars='';
		if (size[2]!==undefined) {scrollbars=',scrollbars='+size[2]}
		var myWindow = window.open($(this).attr('href'), $(this).attr('href'), "width="+size[0]+'",height='+size[1]+scrollbars+'"');
	});
}
$(function () {
	openPop();

	$('label').each(function(index, el) {
		if ($(this).attr('for')==undefined) {
			$(this).find('input').attr('title',$(this).text().trim())
		}
	});
	$('.js-pop').attr('title','새창열림')
	$('.scrolly').attr('tabindex',0)
	//
});

// function chk
function getNumber(fCss, vali_str){
	var temp = trim(fCss.substr(fCss.indexOf(vali_str), fCss.length));
	if (temp.indexOf(" ")>-1){temp = temp.substr(0,temp.indexOf(" "));}
	if (temp.indexOf("-")>-1){
		var arr = temp.split("-");
		temp = arr[1];
	} else {temp=0;}
	try{temp=parseInt(temp);} catch (e){temp=0;}
	return temp;
}
// 앞/뒤에서 White Space가 제거된 값반환
function trim(value) {
	return value.replace(/^\s+|\s+$/g,"");
}
// autoWidth
$(function() {
	var time=new Date();
	// console.log(time)
	$('[class*=w-]').each(function(index, el) {
		w=getNumber(this.className,'w-')
		$(this).css('width',w)
	});
	var endTime=new Date();
	// console.log(endTime-time)
})



// wheelSet(대상, 최소값, 최대값, roop)
function wheelSet(_target, _min, _max, loop) {
  var scrollIntensity = _min
  var scrollMax = _max
	var loopEnabled = loop

  $(_target).hover(function () {
    $(document).on('mousewheel DOMMouseScroll', function (e) {
      var deltaY = e.originalEvent.deltaY
      updateScrollIntensity(deltaY)
			//console.log('Current Scroll Intensity:', scrollIntensity)
			$('.wheel').removeClass('on')
			$('.wheel-item' + scrollIntensity).addClass('on')
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
wheelSet($(".wheelSet"), 1, 5, true);
