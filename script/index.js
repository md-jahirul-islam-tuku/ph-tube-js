const categoryContainer = document.getElementById('category-container');

const loadCategory = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function activeButton(id) {

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => btn.classList.remove('bg-red-600', 'text-white'));

  document.getElementById(id).classList.add('bg-red-600', 'text-white');
}


function displayCategories(categories) {
  for (const item of categories) {
    const result = item.category;
    const div = document.createElement('div');
    div.innerHTML = `
<button id="${`${item.category_id}`}" onclick="loadCategoryVideos(${item.category_id}); activeButton(${item.category_id})" class="text-xl font-semibold px-5 py-3 rounded-md btn hover:bg-red-600 hover:text-white">${result}</button>
`
    categoryContainer.appendChild(div);
  }
}

loadCategory();

function videoDetails(id) {
  document.getElementById('show_modal').showModal();
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayVideoDetails(data)
    })
}

function displayVideoDetails(data) {
  const div = document.getElementById('modal-container');
  div.innerHTML = `
      <h2 class="text-lg font-bold">${data.video.title}</h2>
      <img class="w-full object-cover rounded-2xl" src="${data.video.thumbnail}" alt="">
      <p class="py-4 text-justify">${data.video.description}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
`
}

function loadVideos(e = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${e}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

function displayVideos(videos) {
  const videosContainer = document.getElementById('videos-container');
  videosContainer.innerHTML = '';
  if (videos.length == 0) {
    videosContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center my-40">
      <img class="w-40" src="assets/Icon.png" alt="">
      <h1 class="text-3xl font-bold text-center mt-8">Oops!! Sorry, There is no <br> content here</h1>
    </div>
  `
  }
  videos.map(video => {
    const verified = video.authors[0].verified;
    const div = document.createElement('div');
    div.setAttribute("onclick", `videoDetails("${video.video_id}")`);
    div.setAttribute("title", "For details please click");
    div.innerHTML = `
    <figure class="relative">
      <img class="w-full h-56 object-cover" src=${video.thumbnail} alt="">
      <div class="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-md">
      ${formatMinutes(video.others.posted_date)}
      </div>
    </figure>
    <div class="flex gap-4 mt-5 ml-5">
      <div class="avatar">
        <div class="w-12">
          <img class="h-12 rounded-full" src=${video.authors[0].profile_picture} alt="">
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-bold">${video.title}</h3>
        <p class="text-lg text-neutral-500 my-2 flex gap-1 items-center">${video.authors[0].profile_name} 
        
        ${verified ? `<img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=SRJUuaAShjVD&format=png&color=000000" alt="">` : ""}
        </p>
        <p class="text-lg text-neutral-500">${video.others.views}</p>
      </div>
    </div>
    `
    div.classList.add('card', 'hover:shadow-lg', 'cursor-pointer', 'transition-transform', 'duration-300', 'hover:scale-107',
      'pb-5', 'rounded-2xl', 'shadow-md');
    videosContainer.append(div)
  })
}

loadVideos()



function loadCategoryVideos(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideos(data.category)
    )
}

function formatMinutes(totalMinutes) {
  const minutesInYear = 365 * 24 * 60;
  const minutesInDay = 24 * 60;

  const years = Math.floor(totalMinutes / minutesInYear);
  const days = Math.floor((totalMinutes % minutesInYear) / minutesInDay);
  const hours = Math.floor((totalMinutes % minutesInDay) / 60);
  const minutes = totalMinutes % 60;

  return `${years ? years + 'y' : ''} ${days ? days + 'd' : ''} ${hours ? hours + 'h' : ''} ${minutes}m ago`;
}

document.getElementById('search-box').addEventListener('keyup', (event) => {
  const result = event.target.value;
  loadVideos(result);
})