const inputs = document.querySelectorAll('input')
const stars = document.querySelectorAll('.fa-star')
const address = document.querySelector('#address')
const googleMap = document.querySelector('#google-map')

stars.forEach(star => {
  star.addEventListener('click', (event) => {
    const value = event.target.nextElementSibling.value
    clearStars()
    renderStars(value)
  })
})

googleMap.src = `https://www.google.com/maps/embed/v1/search?q=taiwan&key=AIzaSyBkYPEMIAjDcR08X2DgGoB-jUViPa4_L2s`


// Prevent submit by pressing enter in inputs
inputs.forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  })
})

address.addEventListener('keyup', (event) => {
  const query = event.target.value
  if (!query) {
    query = 'Taiwan'
  } else {
    googleMap.src = `https://www.google.com/maps/embed/v1/search?q=${query}&key=AIzaSyBkYPEMIAjDcR08X2DgGoB-jUViPa4_L2s`
  }
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