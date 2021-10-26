import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor () {
		this._element = this._createModalElement();
  }

	_createModalElement () {
		const markup = `
			<div class="modal">
				<div class="modal__overlay"></div>
				<div class="modal__inner">
					<div class="modal__header">
						<button type="button" class="modal__close">
							<img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
						</button>
					</div>
				</div>
			</div>
		`.trim();
		return createElement(markup);
	}

	open () {
		document.body.append(this._element);
		document.body.classList.add('is-modal-open');
		document.addEventListener('click', this._modalClose.bind(this));
		document.addEventListener('keydown', this._modalClose.bind(this));
	}

	setTitle (title) {
		const markup = `<h3 class="modal__title">${title}</h3>`;
		const titleElement = createElement(markup);
		this._element.querySelector('.modal__header').append(titleElement);
		return this._element;
	}

	setBody (html) {
		const markup = '<div class="modal__body"></div>';
		const modalBodyElement = createElement(markup);
		modalBodyElement.replaceChildren(html);
		this._element.querySelector('.modal__inner').append(modalBodyElement);
		return this._element;
	}

	close () {
		let modal = document.querySelector('.modal');

		if (!modal) return;
		
		modal.remove();
		modal = null;
		document.body.classList.remove('is-modal-open');
	}

	_modalClose (event) {
		const ESCAPE_CODE = 'Escape';

		if (event.target.closest('.modal__close') || event.code === ESCAPE_CODE) {
			this.close();
			document.removeEventListener('click', this._modalClose);
			document.removeEventListener('keydown', this._modalClose);
		}

	}

}