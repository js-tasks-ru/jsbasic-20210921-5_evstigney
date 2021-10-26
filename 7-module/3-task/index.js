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
		const slider = this._createSliderElement();
		slider.addEventListener('click', this._sliderClickHandler.bind(this));
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

	_sliderClickHandler (event) {
		const slider = event.target.closest('.slider');
		const steps = slider.querySelectorAll('.slider__steps span');
		const stepWidth = slider.clientWidth / (this._steps - 1);
		const clickPosition = event.clientX - slider.offsetLeft - slider.clientLeft;
		const newStep = Math.round(clickPosition / stepWidth);

		if (this._value === newStep) return;

		this._value = newStep;
		slider.querySelector('.slider__value').textContent = newStep;
		[...steps].find((step) => step.classList.contains('slider__step-active'))
			.classList.remove('slider__step-active');
		steps[newStep].classList.add('slider__step-active');
		
		const stepWidthInPercents = Math.round(stepWidth * 100 / slider.clientWidth);
		slider.querySelector('.slider__thumb').style.left = `${newStep * stepWidthInPercents}%`;
		slider.querySelector('.slider__progress').style.width = `${newStep * stepWidthInPercents}%`;

		this._slider.dispatchEvent(new CustomEvent('slider-change', {
			detail: this._value,
			bubbles: true,
		}));

	}
}
