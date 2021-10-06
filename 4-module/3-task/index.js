'use strict';

function highlight (table) {
  const headers = [...table.tHead.rows[0].cells].map((cell) => cell.textContent);

	for (let row of table.tBodies[0].rows) {
		[...row.cells].forEach((cell, index) =>	Highlight[headers[index]]?.(row, cell));
	}
}

const Highlight = {
	'Status'(row, cell) {
		if (!cell.dataset.available) {
			row.hidden = true;
			return;
		}
		row.classList.add(`${(cell.dataset.available === 'true') ? 'available' : 'unavailable'}`);
	},

	'Gender'(row, cell) {
		row.classList.add(`${(cell.textContent === 'm') ? 'male' : 'female'}`);
	},

	'Age'(row, cell) {
		if (+cell.textContent < 18) row.setAttribute('style', 'text-decoration: line-through');
	},
};