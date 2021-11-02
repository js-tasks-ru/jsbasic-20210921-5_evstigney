import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';



 export default class Main {

  constructor () {
		
	}

  async render () {
		return Promise.all([this._createCarousel(), this._createRibbonMenu(),
			this._createStepSlider(), this._createCart(), this._createProductsGrid(),])
			.then(
				document.body.addEventListener('product-add', (event) => {
					const addedProduct = this.products.find((item) => item.id === event.detail);
					this.cart.addProduct(addedProduct);
				})
			)
			.then(
				document.body.addEventListener('slider-change', (event) => {
					this.productsGrid.updateFilter( { maxSpiciness: event.detail } );
				})
			)
			.then(
				document.body.addEventListener('ribbon-select', (event) => {
					this.productsGrid.updateFilter( { category: event.detail } );
				})
			)
			.then(
				document.querySelector('#nuts-checkbox')
					.addEventListener('change', (event) => {
						this.productsGrid.updateFilter( { noNuts: event.target.checked } );
				})
			)
			.then(
				document.querySelector('#vegeterian-checkbox')
					.addEventListener('change', (event) => {
						this.productsGrid.updateFilter( { vegeterianOnly: event.target.checked } );
					})
			)
			.catch((err) => console.log(err));
  }

	_createCarousel () {
		this.carousel = new Carousel(slides);
		document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
	}

	_createRibbonMenu () {
		this.ribbonMenu = new RibbonMenu(categories);
		document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
		return this.ribbonMenu.value;
	}

	_createStepSlider () {
		let steps = 5;
		let value = 3;
		this.stepSlider = new StepSlider({steps, value});
		document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
		return {steps, value};
	}
  
	_createCartIcon () {
		return new CartIcon();
	}

	_createCart () {
		this.cartIcon = this._createCartIcon();
		document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.render());
		return this.cart = new Cart(this.cartIcon);
	}

	async _getProducts () {
		let response = await fetch('../../9-module/2-task/products.json');
		let result = await response.json();

		if (response.status !== 200) {
			console.log(result.status);
			throw new Error('А товаров-то и нету.')
		};

		return result;
	}

	async _createProductsGrid () {
		this.products = await this._getProducts();
		this.productsGrid = new ProductsGrid(this.products);
		document.querySelector('[data-products-grid-holder]')
			.replaceChildren(this.productsGrid.elem);
		this.productsGrid.updateFilter({
			noNuts: document.getElementById('nuts-checkbox').checked,
			vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
			maxSpiciness: this.stepSlider.value,
			category: this.ribbonMenu.value
		});
	}
}

let main = new Main();
main.render().then(() => console.log('Страница готова!'));