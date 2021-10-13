'use strict';
function initCarousel() {
	const carousel = document.querySelector('.carousel');
	const slider = carousel.querySelector('.carousel__inner');
	const slides = slider.querySelectorAll('.carousel__slide');
	const width = slider.getBoundingClientRect().width;
	const arrows = {
		left: carousel.querySelector('.carousel__arrow_left'),
		right: carousel.querySelector('.carousel__arrow_right'),
	};
	const shift = {
		max: 0,
		min: -slides.length * width + width,
		current: 0,
	};

	checkArrows(arrows);
	carousel.addEventListener('click', (event) => {
		if (event.target.closest('.carousel__arrow')) slideCarousel(event);
	});


	function slideCarousel (event) {
		const target = event.target.closest('.carousel__arrow');
		const slide = {
			right: () => {
				shift.current -= width;

				if (shift.current <= shift.min) shift.current = shift.min;

				checkArrows(arrows);
				return shift.current;
			},
			left: () => {
				shift.current += width;

				if (shift.current >= shift.max) shift.current = shift.max;

				checkArrows(arrows);
				return shift.current;
			},
		}
		let translateX = 0;

		if (target === arrows.right) translateX = slide.right();
		if (target === arrows.left) translateX = slide.left();

		slider.style.transform = `translateX(${translateX}px)`;
	}

	function checkArrows (arrows) {
		arrows.right.style.display = (shift.current <= shift.min) ? 'none' : 'flex';
		arrows.left.style.display = (shift.current >= shift.max) ? 'none' : 'flex';
	}
}
