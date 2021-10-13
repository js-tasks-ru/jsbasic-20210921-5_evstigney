function toggleText() {
  const toggleButton = document.querySelector('.toggle-text-button');
	const text = document.querySelector('#text');
	
	toggleButton.addEventListener('click', () => {
		text.hidden = !text.hidden;
	});
}
