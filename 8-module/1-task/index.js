import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
		// МОЙ ВАРИАНТ УДАЛИТЬ!!!!!!!!
		const markup = `
		<div class="cart-icon">
		<div class="cart-icon__inner">
          <span class="cart-icon__count"></span>
          <span class="cart-icon__price"></span>
        </div>
		</div>
		`.trim();
		this.elem = createElement(markup);



		// ИСХОДНЫЙ ВАРИАНТ ВЕРНУТЬ!!!!!!!!
    // this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');
      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
		// if (!this.elem.offsetWidth) return;

		const WINDOW_MOBILE_WIDTH = 767;

		// if (document.body.clientWidth <= WINDOW_MOBILE_WIDTH) {
		// 	this._resetStyles();
		// 	return;
		// };

		if (!document.body.scrollTop) this._resetStyles();
		
		const ICON_MARGINS = {
			top: 50,
			right: 10,
			left: 20,
		};
    this.elem.style.display = 'block';
		const leftIndent = Math.min(
			document.querySelector('.container').getBoundingClientRect().right + ICON_MARGINS.left,
  		document.documentElement.clientWidth - this.elem.offsetWidth - ICON_MARGINS.right
		);
		Object.assign(this.elem.style, {
			position: 'fixed',
			top: `${ICON_MARGINS.top}px`,
			zIndex: 1e3,
			right: `${ICON_MARGINS.right}px`,
			left: `${leftIndent}px`,
		});

		// this._fixIcon(ICON_MARGINS);
  }

	// _fixIcon (margins) {
		
	// }

	_resetStyles () {
		Object.assign(this.elem.style, {
			position: '',
			top: '',
			left: '',
			zIndex: ''
		});
	}
}
