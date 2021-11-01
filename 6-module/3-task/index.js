import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
		this._carouselInner = this._createCarouselInnerElement();
		this._carousel = this._createCarouselElement();
		this._arrows = {
			left: this._carousel.querySelector('.carousel__arrow_left'),
			right: this._carousel.querySelector('.carousel__arrow_right'),
		};
		this._currentSlideIndex = 0;
	}

	get elem () {
		return this._carousel;
	}

	_createCarouselInnerElement () {
		const carouselInnerTemplate = `<div class="carousel__inner"></div>`;
		const carouselInnerElement = createElement(carouselInnerTemplate);
		this._slides.forEach((slide) => {
			let slideElement = this._createSlideElement(slide);
			carouselInnerElement.append(slideElement);
		});
		return carouselInnerElement;
	}

	_createCarouselElement () {
		const carouselTemplate = `
			<div class="carousel">
				<div class="carousel__arrow carousel__arrow_right">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</div>
				<div class="carousel__arrow carousel__arrow_left">
					<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
				</div>
			</div>
		`.trim();
		const carouselElement = createElement(carouselTemplate);
		carouselElement.append(this._carouselInner);
		carouselElement.querySelector('.carousel__arrow_left').style.display = 'none';
		carouselElement.addEventListener('click', (event) => {
			if (event.target.closest('.carousel__arrow')) this._arrowClickHandler.bind(this)(event);
			if (event.target.closest('.carousel__button')) this._addButtonHandler.bind(this)();
		});
		return carouselElement;
	}

	_createSlideElement ({image = 'red_curry_vega.png', price = 0, name = 'Any food'}) {
		price = price.toFixed(2);
		const slideTemplate = `
			<div class="carousel__slide" data-id="penang-shrimp">
				<img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
				<div class="carousel__caption">
					<span class="carousel__price">€${price}</span>
					<div class="carousel__title">${name}</div>
					<button type="button" class="carousel__button">
						<img src="/assets/images/icons/plus-icon.svg" alt="icon">
					</button>
				</div>
			</div>
		`.trim();
		return createElement(slideTemplate);
	}

	_arrowClickHandler (event) {
			const width = this._carouselInner.getBoundingClientRect().width;
			const target = event.target.closest('.carousel__arrow');
			
			for (let key in this._arrows) { this._arrows[key].style.display = 'flex'; }
			
			if (target === this._arrows.left) this._arrows.left.style.display	=
				(--this._currentSlideIndex === 0) ? 'none' : 'flex';
			
			if (target === this._arrows.right) this._arrows.right.style.display =
				(++this._currentSlideIndex === this._slides.length - 1) ? 'none' : 'flex';

			this._carouselInner.style.transform = `translateX(${-this._currentSlideIndex * width}px)`;
	}

	_addButtonHandler () {
		this._carousel.dispatchEvent(new CustomEvent('product-add', {
			detail: this._slides[this._currentSlideIndex].id,
			bubbles: true,
		}));
	}
}
