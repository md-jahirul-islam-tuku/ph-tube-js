const categoryContainer = document.getElementById('category-container');

const loadCategory = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function displayCategories(categories) {
  for (const item of categories) {
    const result = item.category;
    const div = document.createElement('div');
    div.innerHTML = `
<button class="text-xl font-semibold px-5 py-3 bg-neutral-300 rounded-md text-neutral-600 btn hover:bg-red-600 hover:text-white">${result}</button>
`
    categoryContainer.appendChild(div);
  }
}

loadCategory()