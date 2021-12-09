const search = document.querySelector('#search')
const cards = document.querySelector('.card-columns')


// Prevent user submit search form
search.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
  }
})

search.addEventListener('keyup', (event) => {
  const keyword = event.target.value
  const query = `/search?keyword=${keyword}`
  axios.get(query)
    .then((response) => {
      let data = response.data
      renderFilteredCards(data)
    })
    .catch((error) => {
      console.log(error)
    })
})

// Handle img error
const images = document.querySelectorAll('img')
images.forEach((img) => {
  img.addEventListener('error', function replaceErrorImg() {
    img.src = 'https://oldtownlaquinta.com/2019/wp-content/uploads/2019/10/dining.jpg'
  })
})


function renderFilteredCards(data) {
  rawHTML = ''
  data.forEach((restaurant => {
    rawHTML +=
      `
      <a href="/restaurants/${restaurant._id}" class="text-secondary">
          <div class="card mb-3">
            <img class="card-img-top" src="${restaurant.image}" alt="${restaurant.name}"">
            <div class=" card-body p-3">
            <h6 class="card-title mb-1">${restaurant.name}</h6>

            <div class="this-category mb-1">
              <i class="fas fa-utensils pr-2"></i> ${restaurant.category}
            </div>

            <span class="badge badge-pill badge-danger font-weight-normal">
              ${restaurant.rating}
              <i class="fas fa-star fa-xs"></i>
            </span>

          </div>
      </div>
      </a>
       `
  }))
  cards.innerHTML = rawHTML
}