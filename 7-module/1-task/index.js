import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
		this._ribbonMenuElement = this._render();
  }

	get elem () {
		return this._ribbonMenuElement;
	}

	_render () {
		const ribbonMenu = this._createRibbonMenuElement();
		const arrows = {
			left: ribbonMenu.querySelector('.ribbon__arrow_left'),
			right: ribbonMenu.querySelector('.ribbon__arrow_right'),
		};
		arrows.left.classList.remove('ribbon__arrow_visible');
		arrows.right.classList.add('ribbon__arrow_visible');

		ribbonMenu.addEventListener('click', (event) => {

			if (event.target.closest('.ribbon__arrow')) {
				this._arrowClickHandler(event, arrows);
			}

			if (event.target.closest('.ribbon__item')) {
				this._categoryClickHandler(event);
			}

		});
		return ribbonMenu;
	}

	_getCategoryItemMarkup ({id, name}) {
		return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`
	}

	_getNavMarkup () {
		const itemsMarkup = this._categories
			.map((category) => this._getCategoryItemMarkup(category))
			.join('');
		return `<nav class="ribbon__inner">${itemsMarkup}</nav>`;
	}

	_createRibbonMenuElement () {
		const markup = `
			<div class="ribbon">
				<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</button>
				${this._getNavMarkup()}
				<button class="ribbon__arrow ribbon__arrow_right">
					<img src="/assets/images/icons/angle-icon.svg" alt="icon">
				</button>
			</div>
		`.trim();
		return createElement(markup);
	}

	_arrowClickHandler (event, arrows) {
		const target = event.target.closest('.ribbon__arrow');

		for (let key in arrows) { 
			if (target === arrows[key]) this._scroll(arrows)[key](target);
		}

	}

	_scroll (arrows) {
		const SHIFT = 350;
		const ribbonInner = this._ribbonMenuElement.querySelector('.ribbon__inner');
		const maxShift = ribbonInner.scrollWidth - ribbonInner.clientWidth;
		const minShift = 0;
		let scrollLeft = ribbonInner.scrollLeft;

		for (let key in arrows) { arrows[key].classList.add('ribbon__arrow_visible'); }

		return {
			left (arrow) {
				ribbonInner.scrollBy(-SHIFT, 0);
				scrollLeft -= SHIFT;

				if (scrollLeft <= minShift) arrow.classList.remove('ribbon__arrow_visible');

			},

			right (arrow) {
				ribbonInner.scrollBy(SHIFT, 0);
				scrollLeft += SHIFT;

				if (scrollLeft >= maxShift) arrow.classList.remove('ribbon__arrow_visible');

			},
		};
	}

	_categoryClickHandler (event) {
		event.preventDefault();
		const items = this._ribbonMenuElement.querySelectorAll('.ribbon__item');
		items.forEach((item) => {
			if (item.matches('.ribbon__item_active')) item.classList.remove('ribbon__item_active');
		});
		const target = event.target.closest('.ribbon__item');
		target.classList.add('ribbon__item_active');
		this._ribbonMenuElement.dispatchEvent(new CustomEvent('ribbon-select', {
			detail: target.dataset.id,
			bubbles: true,
		}));
	}
}
