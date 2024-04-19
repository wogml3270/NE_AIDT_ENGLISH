let dragButtons = document.querySelectorAll('button[draggable]'),
dropZones = document.querySelectorAll('ol li'),
dropButtonLabels = document.querySelectorAll('ol li span'),
dropButtons = document.querySelectorAll('ol li button');
var selectedButton;
for (var i = 0; i < dragButtons.length; i++) {
	dragButtons[i].addEventListener('click', function(e) {
		document.addEventListener('keyup', function(e) {
			if (e.key === 'Escape') {
				if (document.querySelector('button[aria-pressed=true]')){
					for (var i = 0; i < dragButtons.length; i++) {
							dragButtons[i].disabled = false;
							dragButtons[i].setAttribute('draggable','true');
						}
						for (var i = 0; i < dropButtonLabels.length; i++) {
							dropButtonLabels[i].hidden = false;
						}
						for (var i = 0; i < dropButtons.length; i++) {
							dropButtons[i].hidden = true;
						}
						document.getElementById(selectedButton).focus();
						document.getElementById(selectedButton).setAttribute('aria-pressed','false');
						document.querySelector('[role=alert]').innerHTML = 'Cancelled grabbing ' + document.getElementById(selectedButton).innerText;
						return;
				}
			}
		});
		if (this.getAttribute('aria-pressed') == 'true'){
			for (var i = 0; i < dragButtons.length; i++) {
					dragButtons[i].disabled = false;
					dragButtons[i].setAttribute('draggable','true');
				}
				for (var i = 0; i < dropButtonLabels.length; i++) {
					dropButtonLabels[i].hidden = false;
				}
				for (var i = 0; i < dropButtons.length; i++) {
					dropButtons[i].hidden = true;
				}
				document.getElementById(selectedButton).focus();
				document.getElementById(selectedButton).setAttribute('aria-pressed','false');
				document.querySelector('[role=alert]').innerHTML = 'Cancelled grabbing ' + document.getElementById(selectedButton).innerText;
				return;
		}
		for (var i = 0; i < dragButtons.length; i++) {
			dragButtons[i].disabled = true;
		}
		for (var i = 0; i < dropButtonLabels.length; i++) {
			dropButtonLabels[i].hidden = true;
		}
		for (var i = 0; i < dropButtons.length; i++) {
			dropButtons[i].hidden = false;
		}
		this.disabled = false;
		selectedButton = this.id;
		document.querySelector('[role=alert]').innerHTML = document.getElementById(selectedButton).innerText + ' Grabbed.';
		this.setAttribute('aria-pressed','true');
		this.setAttribute('draggable','false');
		for (var i = 0; i < dropButtons.length; i++) {
			dropButtons[i].addEventListener('click', function(e) {
				this.insertAdjacentElement('afterend',document.getElementById(selectedButton));
				for (var i = 0; i < dragButtons.length; i++) {
					dragButtons[i].disabled = false;
				}
				for (var i = 0; i < dropButtonLabels.length; i++) {
					dropButtonLabels[i].hidden = false;
				}
				for (var i = 0; i < dropButtons.length; i++) {
					dropButtons[i].hidden = true;
				}
				document.getElementById(selectedButton).focus();
				document.getElementById(selectedButton).setAttribute('aria-pressed','false');
				document.getElementById(selectedButton).setAttribute('draggable','true');
				document.querySelector('[role=alert]').innerHTML = document.getElementById(selectedButton).innerText + ' Dropped to ' + this.innerText;
			});
		}
	});
};

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	var target = ev.target.draggable ? ev.target.parentElement : ev.target;
	target.appendChild(document.getElementById(data));
}
function resetView() {
	var planetsDiv = document.querySelector('div[ondrop] fieldset');
	for (var i = 0; i < dragButtons.length; i++) {
		planetsDiv.appendChild(dragButtons[i]);
	}
	document.querySelector('[role=alert]').innerHTML = 'Page has been Reset.';
	if (document.querySelector('button[aria-pressed=true]')){
					for (var i = 0; i < dragButtons.length; i++) {
							dragButtons[i].disabled = false;
							dragButtons[i].setAttribute('draggable','true');
						}
						for (var i = 0; i < dropButtonLabels.length; i++) {
							dropButtonLabels[i].hidden = false;
						}
						for (var i = 0; i < dropButtons.length; i++) {
							dropButtons[i].hidden = true;
						}
						document.getElementById(selectedButton).setAttribute('aria-pressed','false');
						return;
				}

}