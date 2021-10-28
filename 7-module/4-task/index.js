export default class StepSlider {
  constructor({ steps, value = 0 }) {
		this._steps = steps;
		this._value = value;
		this._slider = this._render();
  }

	get elem () {
		return this._slider;
	}

	_render () {
		let slider = this._createSliderElement();

		slider.addEventListener('click', this._sliderClickHandler.bind(this));
		slider.querySelector('.slider__thumb')
			.addEventListener('pointerdown', this._thumbMoveHandler.bind(this));
		return slider;
	}

	_createSliderElement () {
		const markup = `
			<div class="slider">
				<div class="slider__thumb" style="left: 50%;">
					<span class="slider__value">2</span>
				</div>
				<div class="slider__progress" style="width: 50%;"></div>
				<div class="slider__steps">
					${new Array(this._steps).fill('<span></span>').join('')}
				</div>
			</div>
		`.trim();
		let sliderElement = document.createElement('div');
		sliderElement.innerHTML = markup;
		sliderElement = sliderElement.firstChild;
		sliderElement.querySelectorAll('.slider__steps span')[0].classList.add('slider__step-active');
		return sliderElement;
	}

	_getValue (event) {
		const steps = this._slider.querySelectorAll('.slider__steps span');
		const stepWidth = this._slider.clientWidth / (this._steps - 1);
		const area = {
			min: 0,
			max: this._slider.clientWidth,
		};
		let clickPosition = event.clientX - this._slider.offsetLeft - this._slider.clientLeft;
		clickPosition = (clickPosition < area.min) ? area.min
			: (clickPosition > area.max) ? area.max
			: clickPosition;
		const value = Math.round(clickPosition / stepWidth);

		if (value === this._value) return;

		this._value = value;
		this._slider.querySelector('.slider__value').textContent = value;
		[...steps].find((step) => step.classList.contains('slider__step-active'))
			.classList.remove('slider__step-active');
		steps[value].classList.add('slider__step-active');
		
		return value;
	}

	_sliderClickHandler (event) {
		const slider = event.target.closest('.slider');
		const stepWidth = this._slider.clientWidth / (this._steps - 1);
		const value = this._getValue(event);
		const stepWidthInPercents = Math.round(stepWidth * 100 / slider.clientWidth);
		slider.querySelector('.slider__thumb').style.left = `${value * stepWidthInPercents}%`;
		slider.querySelector('.slider__progress').style.width = `${value * stepWidthInPercents}%`;
		this._createSliderChangeEvent();
	}

	_thumbMoveHandler (event) {

		if (!event.target.closest('.slider__thumb')) return;

		event.preventDefault();
		const slider = event.target.closest('.slider');
		const thumb = event.target.closest('.slider__thumb');
		this.elem.classList.add('slider_dragging');
		const getValue = this._getValue.bind(this);
		const createEvent = this._createSliderChangeEvent.bind(this);
		moveThumb = moveThumb.bind(this);
		endMove = endMove.bind(this);
		thumb.ondragstart = () => false;

		slider.addEventListener('pointermove', moveThumb);
		slider.addEventListener('pointerup', endMove);
		document.addEventListener('pointerup', endMove);

		function moveThumb (event) {
			event.preventDefault();
			const area = {
				min: 0,
				max: 100,
			};
			let position = event.clientX - slider.offsetLeft - slider.clientLeft;
			position = Math.round(position * 100 / slider.clientWidth);
			position = (position < area.min) ? area.min
				: (position > area.max) ? area.max
				: position;
			this.elem.querySelector('.slider__thumb').style.left = `${position}%`;
			this.elem.querySelector('.slider__progress').style.width = `${position}%`;
			getValue(event);
		}

		function endMove () {
			slider.classList.remove('slider_dragging');
			createEvent();
			slider.removeEventListener('pointermove', moveThumb);
			slider.removeEventListener('pointerup', endMove);
			document.removeEventListener('pointerup', endMove);
		}
	}

	_createSliderChangeEvent () {
		this._slider.dispatchEvent(new CustomEvent('slider-change', {
			detail: this._value,
			bubbles: true,
		}));
	}
}