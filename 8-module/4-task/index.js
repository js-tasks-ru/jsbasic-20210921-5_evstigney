/* eslint-disable indent */
import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  constructor(cartIcon) {
		this.cartItems = [];
    this.cartIcon = cartIcon;
		this._modal = new Modal();
    this.addEventListeners();
  }

  get cart () {
    return this;
  }

  addProduct (product) {
    product = product || null;

    if (!product) return;

    let index = this.cartItems.findIndex((item) => item.product.id === product.id);

    if (index >= 0) {
      this.cartItems[index].count += 1;
    } else { 
      this.cartItems.push({product: product, count: 1});
    }

		index = this.cartItems.findIndex((item) => item.product.id === product.id);
		
    this.onProductUpdate(this.cartItems[index]);
  }

  updateProductCount (productId, amount) {
    amount = amount || 0;
    const index = this.cartItems.findIndex((item) => item.product.id === productId);
    this.cartItems[index].count += +amount;

    if (this.cartItems[index].count === 0) this.cartItems.splice(index, 1);

    this.onProductUpdate(this.cartItems[index]);
  }

  isEmpty () {
    for (let item of this.cartItems) { if (item) return false; }
    return true;
  }

  getTotalCount () {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += item.product.price * item.count;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm () {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal () {
    const TITLE = 'Your order';
    this._modal.setTitle(TITLE);
    this._modal.setBody(this._createProductCards(this.cartItems));
    const form = this.renderOrderForm();
    this._modal.elem.querySelector('.modal__body').append(form);
		const onSubmit = this.onSubmit.bind(this);
		const counterButtonClickHandler = (event) => {
			this._counterButtonClickHandler(event);
			
			if (!this.cartItems.length) this._modal.close();

		};
    this._modal.open();

    this._modal.elem.addEventListener('click', (event) => {

      if (event.target.closest('.cart-counter__button')) counterButtonClickHandler(event);

    });

		form.addEventListener('submit', onSubmit);
    return this._modal;
  }

  onProductUpdate(cartItem) {

		if (document.body.classList.contains('is-modal-open') && cartItem) {
			const newPrice = cartItem.product.price * cartItem.count;
			let productElement = document.querySelector(`[data-product-id="${cartItem.product.id}"]`);
			const cartPriceElement = productElement.querySelector('.cart-product__price');
			const totalPriceElement = document.querySelector(`.cart-buttons__info-price`);
			productElement.querySelector('.cart-counter__count').textContent = cartItem.count;
			cartPriceElement.textContent = `${cartPriceElement.textContent[0]}${newPrice.toFixed(2)}`;
			totalPriceElement.textContent = `${totalPriceElement.textContent[0]}${this.getTotalPrice().toFixed(2)}`;

			if (!this.cartItems.find(item => item.product.id === cartItem.product.id)) {
				productElement.remove();
				productElement = null;

				return;
			}
		}

    this.cartIcon.update(this);
  }

  onSubmit (event) {
    event.preventDefault();
		
		const URL = 'https://httpbin.org/post';
		const SUCCESS_MESSAGE = 'Success!';
		const formElement = document.querySelector('.cart-form');
		const submitButton = event.target.querySelector('[type="submit"]');
		const successMarkup = `
			<div class="modal__body-inner">
				<p>
					Order successful! Your order is being cooked :) <br>
					We’ll notify you about delivery time shortly.<br>
					<img src="/assets/images/delivery.gif">
				</p>
			</div>
			`.trim();
		submitButton.classList.add('is-loading');
		fetch(URL, { method: 'POST', body: new FormData(formElement) }).then( 
			responce => {
				submitButton.classList.remove('is-loading');
				this.cartItems.length = 0;
				this.onProductUpdate();
				this._modal.setTitle(SUCCESS_MESSAGE);
				this._modal.elem.querySelector('.modal__body').innerHTML = successMarkup;
			},
		);
		
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  _createProductCards (products) {
    const div = createElement('<div></div>');
    const render = this.renderProduct.bind(this);
    products.forEach(({product, count}) => div.append(render(product, count)));
    return div;
  }

  _counterButtonClickHandler (event) {
    const target = event.target.closest('.cart-counter__button');
    const productId = event.target.closest('[data-product-id]').dataset.productId;
		const productItem = this.cartItems.find(item => item.product.id === productId) || null;
			
    if (!productItem.count && target.closest('.cart-counter__button_minus')) return;
    
    const changeAmount = (target.closest('.cart-counter__button_plus')) ? 1 : -1;

    this.updateProductCount(productId, changeAmount);

    this.onProductUpdate(productItem);
  }
}

