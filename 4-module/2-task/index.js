function makeDiagonalRed(table) {
	let rows = table.tBodies[0].rows;

  for (let i = 0; i < rows.length; i++) {
		rows[i].cells[i].style.backgroundColor = 'red';
	}
}