
import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor (products) {
    this._products = products.slice();
		this._elem = this._render();
    this._filters = {};
  }

	get elem () {
		return this._elem;
	}

	updateFilter (filters) {
		let productsArr = this._products;

		for (let key in filters) {
			productsArr = this._filterArr(productsArr)[key](filters[key]);
		}

		this._elem = this._render(productsArr);
		return this._elem;
	}

	_render (productsArr) {
		productsArr = productsArr ?? this._products;

		const markup = `
			<div class="products-grid">
			<div class="products-grid__inner">
				<!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
			</div>
			</div>
		`.trim();
		this._elem = createElement(markup);
		productsArr.forEach((product) => {
			let productElement = new ProductCard(product);
			this._elem.querySelector('.products-grid__inner').append(productElement.elem);
		});
		console.log(productsArr);
		return this._elem;
	}

	_filterArr (array) {
		const filter =  {
			noNuts: () => array.filter((item) => !item?.nuts),
			vegeterianOnly: () => array.filter((item) => item?.vegeterian),
			maxSpiciness: (value) => array.filter((item) => item.spiciness <= value),
			category: (value) => array.filter((item) => item.category === value),
		};
		return filter;
	}
}
