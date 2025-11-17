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

const videosContainer = document.getElementById('videos-container');

const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

function displayVideos(videos) {
  for (const video of videos) {
    const verified= video.authors[0].verified;
    console.log(typeof verified)
    const div = document.createElement('div')
    div.innerHTML=`
    <figure>
      <img class="w-full h-56 rounded-xl" src=${video.thumbnail} alt="">
    </figure>
    <div class="flex gap-4 mt-5">
      <div class="avatar">
        <div class="w-12">
          <img class="h-12 rounded-full" src=${video.authors[0].profile_picture} alt="">
        </div>
      </div>
      <div>
        <h3 class="text-xl font-bold">${video.title}</h3>
        <p class="text-xl text-neutral-500 my-2">${video.authors[0].profile_name} 
        
        ${verified? '<i class="fa-solid fa-circle-check"></i>':""}
        
        </p>
        <p class="text-xl text-neutral-500">${video.others.views}</p>
      </div>
    </div>
    `
    div.classList='card';
    videosContainer.appendChild(div)
  }
}

loadVideos()