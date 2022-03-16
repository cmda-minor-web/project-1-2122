const ul = document.querySelector('ul');
const dropDown = document.querySelector("#selectNumber")
dropDown.addEventListener("change", function(e) {
	replace()
	getBooks()
});

function getBooks() {
	const cors = 'https://cors-anywhere.herokuapp.com/';
	const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
	const valueDropdown = dropDown.options[dropDown.selectedIndex].value.toString();
	const key = '17a9c4d4d56a41b55abc2d3096e94be4';
	const secret = '4289fec4e962a33118340c888699438d';
	const detail = 'Default';
	const url = `${cors}${endpoint}${valueDropdown}&authorization=${key}&detaillevel=${detail}&output=json`;
	const config = {
		Authorization: `Bearer ${secret}`
	};
	showLoading()
	fetch(url, config).then(response => {
		return response.json();
	}).then(data => {
		renderBooks(data);
		hideLoading()
	}).catch(err => {
		console.log(err);
	});
}

function renderBooks(data) {
	const results = data.results;
	console.dir(results);
	results.forEach((book) => {
		const html = `
            <li>
                <img src="${book.coverimages[1]}">
                <h2>${book.titles[0]}</h2>
                <p>${book.summaries ? book.summaries[0] : 'Sorry, geen samenvatting beschikbaar.'}</p>
                <p>${book.authors}</p>
            </li>
          `;
		ul.insertAdjacentHTML('beforeend', html);
	});
}

function showLoading() {
	const loadingSection = document.querySelector('div');
	loadingSection.classList.add('loader');
}

function hideLoading() {
	const loadingSection = document.querySelector('.loader');
	loadingSection.classList.remove('loader');
}

function replace() {
	for (const node of document.querySelectorAll("li:not(li:first-of-type), li h2, li p, li img")) {
		const parent = node.parentNode;
		const children = Array.from(node.children);
		for (const child of children) {
			node.removeChild(child);
			parent.insertBefore(child, node);
		}
		parent.removeChild(node);
	}
}