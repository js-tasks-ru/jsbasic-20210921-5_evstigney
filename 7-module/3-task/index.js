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
		const activeStepClass = 'slider__step-active';
		const steps = slider.querySelectorAll('.slider__steps span');
		steps[0].classList.add(activeStepClass);
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
		return sliderElement;
	}
}
