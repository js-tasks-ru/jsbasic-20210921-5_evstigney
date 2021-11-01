import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';



 export default class Main {

  constructor() {
  }

  async render() {
		return new Promise.all([this._addCarousel(), this._addRiddonMenu()]);
  }

	_addCarousel () {
		let carousel = new Carousel(slides);
		document.body.append(carousel.elem);
	}

	_addRibbonMenu () {
		let ribbonMenu = new RibbonMenu(categories);
		document.querySelector('[data-ribbon-holder').append(ribbonMenu.elem);
	}
  
}


let main = new Main();
main._addCarousel();