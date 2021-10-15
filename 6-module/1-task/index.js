/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor (rows) {
		this._rows = rows;
		this._elem = this._createTable();
  }

	get elem () {
		return this._elem;
	}

	_createTable () {
		const table = document.createElement('table');
		const tHead = this._createTHead();
		const tBody = this._createTBody();
		table.append(tHead);
		table.append(tBody);
		return table;
	}

	_createTHead () {
		const headers = {
			'name': 'Имя',
			'age': 'Возраст',
			'salary': 'Зарплата',
			'city': 'Город',
		};
		const keys = Object.keys(this._rows[0]);
		const tHead = document.createElement('thead');
		const tr = document.createElement('tr');

		for (let i = 0; i <= keys.length; i++) {
			let th = document.createElement('th');
			th.textContent = (keys[i]) ? headers[keys[i]] : '';
			tr.append(th);
		}

		tHead.append(tr);
		return tHead;
	}

	_createTBody () {
		const tBody = document.createElement('tbody');

		for (let row of this._rows) {
			let tr = this._createTr(row);
			tBody.append(tr);
		}

		return tBody;
	}

	_createTr (row) {
		const keys = Object.keys(row);
		const tr = document.createElement('tr');

		for (let i = 0; i <= keys.length; i++) {
			let td = document.createElement('td');
			
			if (keys[i]) {
				td.textContent = row[keys[i]];
			} else {
				let deleteButton = this._createDeleteButton();
				td.append(deleteButton);
			}

			tr.append(td);
		}

		return tr;
	}

	_createDeleteButton () {
		const button = document.createElement('button');
		button.textContent = 'X';
		button.addEventListener('click', removeRow);

		function removeRow (event) {
			let row = event.target.closest('tr');

			if (!row) return;
			
			row.remove();
			row = null;
			button.removeEventListener('click', removeRow);
		}

		return button;
	}
}
