const modal = document.querySelector(".modal")
const toggleModal = document.querySelector(".toggle-modal")

modal.addEventListener("click", event => {
  if(event.target === modal) {
    modal.classList.remove("active")
  }
})

toggleModal.addEventListener("click", event => {
  modal.classList.add("active")
})