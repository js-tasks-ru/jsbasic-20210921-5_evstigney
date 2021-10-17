import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
		this._carousel = this._createCarouselElement();
		this._carouselInner = this._createCarouselInnerElement();
	}

	get elem () {
		this._carousel.append(this._carouselInner);
		const slidesLength = this._slides.length;
		const arrows = {
			left: this._carousel.querySelector('.carousel__arrow_left'),
			right: this._carousel.querySelector('.carousel__arrow_right'),
		};
		let currentSlideIndex = 0;
		let width = 0;
		checkArrows();
		this._carousel.addEventListener('click', (event) => {

			if (event.target.closest('.carousel__arrow')) {
				const target = event.target.closest('.carousel__arrow');
				width = this._carouselInner.getBoundingClientRect().width;
				
				if (target === arrows.left) --currentSlideIndex;
				if (target === arrows.right) ++currentSlideIndex;

				checkArrows();
				this._carouselInner.style.transform = `translateX(${-currentSlideIndex * width}px)`;
			}

		});

		function checkArrows () {
			for (let key in arrows) { arrows[key].style.display = 'flex'; }

			if (currentSlideIndex === 0) arrows.left.style.display = 'none';
			if (currentSlideIndex === slidesLength - 1) arrows.right.style.display = 'none';
		}

		return this._carousel;
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
		return carouselElement;
	}

	_createCarouselInnerElement () {
		const carouselInnerTemplate = `<div class="carousel__inner"></div>`;
		const carouselInnerElement = createElement(carouselInnerTemplate);
		this._slides.forEach((slide, index) => {
			let slideElement = this._createSlideElement(slide);
			slideElement.setAttribute('data-index', index);
			carouselInnerElement.append(slideElement);
		});
		return carouselInnerElement;
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
		const slideElement = createElement(slideTemplate);
		return slideElement;
	}
}
