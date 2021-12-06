const stars = document.querySelectorAll('.fa-star')

console.log(stars)

stars.forEach(star => {
  star.addEventListener('click', (event) => {
    const value = event.target.nextElementSibling.value
    clearStars()
    renderStars(value)
  })
})


// Functions

function clearStars() {
  stars.forEach(star => {
    star.classList.remove('fas')
  })
}

function renderStars(value) {
  for (let i = 0; i < value; i++) {
    stars[i].classList.toggle('fas')
  }
}