// 초기화
document.addEventListener('DOMContentLoaded', function() {
	rightLessionDrg();
});

let dragElement;
let dropElement;
let leftPlanTabInput = document.querySelectorAll('.left-bar__radiogroup input[type="radio"]')
let leftPlanTabsLabel = document.querySelectorAll('.left-bar__radiogroup label')
let leftPlanTabsPanel = document.querySelectorAll('.lessonPlan__tabs')

let leftPlanInput = document.querySelectorAll('.lessonPlan__tabs.tabpanel1 input[type="radio"]')
let leftPlanList = document.querySelectorAll('.lessonPlan__tabs.tabpanel1 li')

let rightLessonInput = document.querySelectorAll('.lessonlist input[type="radio"]')
let rightLessonList = document.querySelectorAll('.lessonlist li')

let dragItems = document.querySelectorAll('.lessonlist input[type="radio"]:checked, .lessonPlan__tabs.tabpanel1 input[type="radio"]:checked');
let dropZones = document.querySelectorAll('.lessonPlan__tabs.tabpanel1 li, .lessonlist li');

// 탭 전환
leftPlanTabInput.forEach(function(input) {
    input.addEventListener('change', function() {
        leftPlanTabsLabel.forEach(function(label) {
            label.classList.remove('on');
        });
        this.parentElement.classList.add('on');
        let tabIdx = Array.from(this.parentElement.parentNode.children).indexOf(this.parentElement);
        leftPlanTabsPanel.forEach(function(tab, index) {
            tab.classList.remove('on');
            if (index === tabIdx) {
                tab.classList.add('on');
            }
        });
    });
});

// 추가 수업 자료 드래그 설정
leftPlanInput.forEach(function(input) {
    input.addEventListener('change', function() {
        if (this.checked) {
            let currentLi = this.closest('li');
			currentLi.classList.add('draggable');
			currentLi.setAttribute('draggable', true);
			
			rightLessonInput.forEach(function(input) {
				if (input.checked) {
					input.checked = false;
					let targetLi = input.closest('li');
					targetLi.classList.remove('draggable')
					targetLi.removeAttribute('draggable')
				}
				let targetList = input.closest('li');
				targetList.setAttribute('droppable', true);
				targetList.classList.add('droppable');
			})
			dragAndDrop(currentLi, dropZones)
			//dragAndDrop(currentLi, dropZones)
        }
    });
});

// 나의 수업안 드래그 설정
function rightLessionDrg(){
	rightLessonInput.forEach(function(input) {
		input.addEventListener('change', function() {
			const rightLessonUp = document.querySelectorAll('.lessonMoveUp')
			const rightLessonDown = document.querySelectorAll('.lessonMoveDown')
			const rightLessonUpDown = document.querySelectorAll('.lessonMoveUp, .lessonMoveDown')
			rightLessonUpDown.forEach(function(button) {
				button.remove();
			});
			//console.log('rightLessonInput');
			
			if (this.checked) {
				let currentLi = this.closest('li');
				let createLessonlistBtn = document.createElement('div')
				createLessonlistBtn.classList.add('lessonlist__btn');			
				let upButton = document.createElement('button');
				upButton.type = 'button';
				upButton.className = 'lessonMoveUp';
				upButton.innerHTML = '<i class="blind">위로 이동</i>';
				let downButton = document.createElement('button');
				downButton.type = 'button';
				downButton.className = 'lessonMoveDown';
				downButton.innerHTML = '<i class="blind">아래로 이동</i>';
				currentLi.appendChild(upButton);
				currentLi.appendChild(downButton);
				currentLi.setAttribute('draggable', true);
				
				leftPlanInput.forEach(function(input) {
					if (input.checked) {
						input.checked = false;
						let targetLi = input.closest('li');
						targetLi.classList.remove('draggable')
						targetLi.removeAttribute('draggable')
					}
					let targetList = input.closest('li');
					targetList.setAttribute('droppable', true);
					targetList.classList.add('droppable');
				})
				
				//console.log('right currentLi', currentLi, '---');
				dragAndDrop(currentLi, dropZones)
				upButton.addEventListener('click', function() {
					if (currentLi.previousElementSibling) {
						currentLi.parentNode.insertBefore(currentLi, currentLi.previousElementSibling);
					}
					this.focus();
				});
				downButton.addEventListener('click', function() {
					if (currentLi.nextElementSibling) {
						currentLi.parentNode.insertBefore(currentLi.nextElementSibling, currentLi);
					}
					this.focus();
				});
			}
		});
	});
}


function dragAndDrop(dragItems, dropZones) {
    // 드래그 가능 항목 설정
	if (!Array.isArray(dragItems)) {
        dragItems = [dragItems];
    }
    dragItems.forEach(item => {
        item.setAttribute('draggable', true);
        item.addEventListener('dragstart', function(e) {
            // 각 항목에 대한 고유 식별자를 설정 (예: ID 사용)
           // e.dataTransfer.setData('text', e.target.outerHTML); // 이것은 단순 복사용으로 사용됨.
			dragElement = item;
            e.dataTransfer.dropEffect = 'move';
        }, false);
    });

    // 드랍 영역 설정
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function(e) {
            e.preventDefault(); 
            this.classList.add('dragover');
        }, false);

        zone.addEventListener('dragleave', function(e) {
            this.classList.remove('dragover');
        }, false);

        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');

			//let dropItem = e.target.closest('li');
			//console.log('itemId', itemId, '---', this);
			console.log(this, 'e.target',);
			//let dropText = e.dataTransfer.getData('text', e.target.innerHTML)
			// 드래그된 항목의 HTML 문자열을 가져옵니다.
			//const htmlString = e.dataTransfer.getData('text/plain', e.target.innerHTML);

			if (dragElement && this !== dragElement) {
                this.parentNode.insertBefore(dragElement, this); // 드래그한 요소를 새 위치에 삽입합니다.
            }
			rightLessionDrg();
        });
    });
}
/* function dragAndDrop(items, zones) {
    // 드래그 가능 항목 설정
	//console.log('dragItems', items, '---');
	
	//console.log('zones', zones, '');
	
	console.log('itme', items, '---', zones, '---');
    dragItems.forEach(items => {
        items.setAttribute('draggable', true);
        items.addEventListener('dragstart', function(e) {
			e.dataTransfer.setData('text/plain', e.target.innerHTML);
            e.dataTransfer.dropEffect = 'move';
        });
    });

    // 드랍 영역 설정
    dropZones.forEach(zones => {
		zones.addEventListener('dragstart', function(e) {
			e.dataTransfer.setData('text/plain',  e.target.innerHTML); // Ensure 'this.id' is the actual ID of the element being dragged
		});
        zones.addEventListener('drag', function(e) {
            e.preventDefault();
            this.classList.add('drag');
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', e.target.innerHTML);
        });
        zones.addEventListener('dragover', function(e) {
            e.preventDefault(); 
            this.classList.add('dragover'); 
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.effectAllowed = 'move';
        });

        zones.addEventListener('dragleave', function(e) {
            this.classList.remove('dragover'); // 드래그 오버 스타일 제거
        });

        zones.addEventListener('drop', function(e) {
            e.preventDefault();
			console.log('e.target', e.target.tagName, '---');
            this.classList.remove('dragover');
            const draggedItem = e.dataTransfer.getData('text/plain');
			console.log('draggedItem', draggedItem, '---');
			
			this.appendChild(draggedItem);
        });
    });
}

function dragAndDropReset() {
} */