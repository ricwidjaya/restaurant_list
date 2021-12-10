const form = document.querySelector('form')

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
