
import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor (products) {
    this._products = products.slice();
		this._customProducts = null;
    this._filters = {};
		this._elem = this._render();
  }

	get elem () {
		return this._elem;
	}

	updateFilter (filters) {
		Object.assign(this._filters, filters);
		this._customProducts = this._products.slice();

		for (let key in this._filters) {
			this._customProducts = this._filterArr(this._customProducts)[key](this._filters[key]);
		}

		this.elem.querySelectorAll('.card').forEach((card) => {
			if (card) {
				card.remove();
				card = null;
			}
		});
		this._renderCards(this._customProducts);
		return this;
	}

	_render (productsArr) {
		productsArr = productsArr || this._products;
		const markup = `
			<div class="products-grid">
			<div class="products-grid__inner">
				<!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
			</div>
			</div>
		`.trim();
		this._elem = createElement(markup);
		this._renderCards(productsArr);
		return this._elem;
	}

	_renderCards (arr) {
		arr.forEach((product) => {
			this._elem.querySelector('.products-grid__inner').append(new ProductCard(product).elem);
		});
	}

	_filterArr (array) {
		const filter =  {
			noNuts: (value) => array.filter((item) => (!value) ? item : !item.nuts),
			vegeterianOnly: (value) => array.filter((item) => (value) ? item.vegeterian == value : item),
			maxSpiciness: (value) => array.filter((item) => (value) ? item.spiciness <= value : item),
			category: (value) => array.filter((item) => (!value) ? item : item.category === value),
		};
		return filter;
	}
}
