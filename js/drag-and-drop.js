const fileInput = document.querySelector('#fileupload')
const uploadArea = document.querySelector(".upload-area")

fileInput.addEventListener('change', function() {
  const selectedFiles = fileInput.files
  const numberOfFiles = selectedFiles.length
  console.log(`Number of selected files: ${numberOfFiles}`)
  uploadArea.innerHTML = `You have selected ${numberOfFiles} file(s)`
})

uploadArea.addEventListener('dragenter', function(e) {
  e.preventDefault()
  uploadArea.style.backgroundColor = 'hsl(0 0% 88%)'
})

uploadArea.addEventListener('dragover', function(e) {
  e.preventDefault()
  uploadArea.style.backgroundColor = 'hsl(0 0% 88%)'
})

uploadArea.addEventListener('dragleave', function() {
  uploadArea.style.backgroundColor = ''
})

uploadArea.addEventListener('drop', function(e) {
  e.preventDefault()
  uploadArea.style.backgroundColor = ''
  const droppedFiles = e.dataTransfer.files
  const numberOfDroppedFiles = droppedFiles.length
  uploadArea.innerHTML = `You have selected ${numberOfDroppedFiles} file(s)`
  fileInput.files = droppedFiles;
})