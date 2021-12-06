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

address.addEventListener('keyup', (event) => {
  const query = event.target.value
  googleMap.src = `https://www.google.com/maps/embed/v1/search?q=${query}&key=AIzaSyBkYPEMIAjDcR08X2DgGoB-jUViPa4_L2s`
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