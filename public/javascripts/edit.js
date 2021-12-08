const inputs = document.querySelectorAll('input')

// Prevent submit by pressing enter in inputs
inputs.forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  })
})