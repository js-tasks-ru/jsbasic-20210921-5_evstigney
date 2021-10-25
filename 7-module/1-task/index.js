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
		return ribbonMenu;
	}

	_getCategoryItemMarkup ({id, name}) {
		return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`
	}

	_createNavMarkup () {
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
			${this._createNavMarkup()}
			<button class="ribbon__arrow ribbon__arrow_right">
      	<img src="/assets/images/icons/angle-icon.svg" alt="icon">
    	</button>
  	</div>
		`.trim();
		return createElement(markup);
	}
}
