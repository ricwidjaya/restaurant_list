const search = document.querySelector('#search')
const cards = document.querySelector('.card-columns')

// Prevent user submit search form
search.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
  }
})

// Listen to query for live search API
search.addEventListener('keyup', (event) => {
  const keyword = event.target.value
  const query = `/search?keyword=${keyword}`
  axios.get(query)
    .then((response) => {
      let data = response.data
      if (data.length) {
        renderFilteredCards(data)
        confirmDeleteListener()
      } else {
        noSearchResultRender()
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

// Confirm delete
confirmDeleteListener()

// Handle img error
const images = document.querySelectorAll('img')
images.forEach((img) => {
  img.addEventListener('error', function replaceErrorImg() {
    img.src = 'https://oldtownlaquinta.com/2019/wp-content/uploads/2019/10/dining.jpg'
  })
})

function confirmDeleteListener() {
  const forms = document.querySelectorAll('.delete-form')
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      // Prevent form submitting when click
      event.stopPropagation()
      event.preventDefault()
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: "You'll be redirecting to home page.",
            icon: 'success',
            showConfirmButton: false
          })
          // Show success icon for 2 sec and submit the form to API
          setTimeout(() => {
            form.submit()
          }, 2000)
        }
      })
    })
  })
}

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

            <div class="options">
              <span class="badge badge-pill badge-danger font-weight-normal">
                ${restaurant.rating}
                <i class="fas fa-star fa-xs"></i>
              </span>

              <p class="mb-1">
                <a href="restaurants/${restaurant._id}/edit">
                  <i class="fas fa-edit" style="user-select: auto;"></i>
                  Edit
                </a>
              </p>
              <form class="delete-form" action="/restaurants/${restaurant._id}?_method=DELETE" method="POST">
                <p class="mb-1">
                  <button type="submit" class="delete">
                    <i class="fas fa-trash-alt"></i>
                    Delete
                  </button>
                </p>
              </form>
            </div>
          </div>
      </div>
      </a>
       `
  }))
  cards.innerHTML = rawHTML
}

function noSearchResultRender() {
  // Photo credit by by Kapil Gopinathan
  cards.innerHTML = `
  <img class="no-result" src="https://cdn.dribbble.com/users/760295/screenshots/4433975/media/682a69bc4378238a53b9fdcc33d1759c.png">
  `
}