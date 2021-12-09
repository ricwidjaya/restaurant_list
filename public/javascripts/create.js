const inputs = document.querySelectorAll('input')
const stars = document.querySelectorAll('.fa-star')
const form = document.querySelector('form')

stars.forEach(star => {
  star.addEventListener('click', (event) => {
    const value = event.target.nextElementSibling.value
    clearStars()
    renderStars(value)
  })
})


// Prevent submit by pressing enter in inputs
inputs.forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  })
})


// Form validation
form.addEventListener('submit', (event) => {
  if (!form.checkValidity()) {
    event.preventDefault()
  }
  form.classList.add('was-validated')
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