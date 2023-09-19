const audio = document.querySelector('audio')
const progressBar = document.querySelector('.bar')
const playPauseButton = document.querySelector('.playstate')
const stopButton = document.querySelector('.stop')
const timeDisplay = document.querySelector('.time')
const muteButton = document.querySelector('.mute')
const volumeInput = document.querySelector('.volume')
const albumCover = document.querySelector(".album")
const pauseOverlay = document.querySelector(".pause-overlay")
const playlistBtn = document.querySelector(".playlist-btn")
const playlist = document.querySelector(".playlist")
const currentSong = document.querySelector(".current-song")
const controls = document.querySelector(".controls")
const repeatCheckbox = document.querySelector("#repeat-playlist")
const repeatButton = document.querySelector(".repeat");
const repeatButtonIcon = document.querySelector(".fa-repeat");
const playlistItems = document.querySelectorAll('.playlist ul li')

let isPlaying = false
let currentSongIndex = 0;
let isRepeat = false;
let musicListeningState = 0;


function playSong(index) {
  const playlistItems = document.querySelectorAll('.playlist ul li');
  const item = playlistItems[index];
  if (item) {
    const audioFile = item.getAttribute('data-audio-file');
    audio.src = audioFile;
    audio.play();
    currentSong.textContent = `Now Playing: ${item.textContent}`;
    albumCover.src = item.getAttribute("data-image-file");
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
    playPauseButton.setAttribute("title", "pause");
    playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>";
    pauseOverlay.classList.remove("active");
    isPlaying = true;
    currentSongIndex = index;
  }
}

function handleRepeatInteractionState(){
  if(musicListeningState === 1){
    playNextSong();
  } else if(musicListeningState === 2){
    playSong(currentSongIndex);
  } else if(musicListeningState === 3){
    const playlistItems = document.querySelectorAll('.playlist ul li');
    const lastItemInPlaylist = Array.from(playlistItems).indexOf(playlistItems[playlistItems.length - 1]);
    if(lastItemInPlaylist === currentSongIndex){
      playSong(0)
    } else {
      playNextSong()
    }
  } else {
    playNextSong();
  }
}

function playNextSong() {
  if (currentSongIndex < playlistItems.length - 1) {
    playSong(currentSongIndex + 1);
  } else if (isRepeat) {
    playSong(0);
  }
}

function playPreviousSong() {
  if (currentSongIndex > 0) {
    playSong(currentSongIndex - 1);
  }
}

playPauseButton.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play()
    playPauseButton.classList.remove('play')
    playPauseButton.classList.add('pause')
    playPauseButton.setAttribute("title", "pause")
    playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>"
    pauseOverlay.classList.remove("active")
    isPlaying = true
  } else {
    audio.pause()
    playPauseButton.classList.remove('pause')
    playPauseButton.classList.add('play')
    playPauseButton.setAttribute("title", "play")
    playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>"
    pauseOverlay.classList.add("active")
    isPlaying = false
  }
})

stopButton.addEventListener('click', () => {
  audio.pause()
  audio.currentTime = 0
  progressBar.value = 0
  isPlaying = false
  playPauseButton.classList.remove('pause')
  pauseOverlay.classList.remove("active")
  playPauseButton.classList.add('play')
  playPauseButton.setAttribute("title", "play")
  playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>"
})

audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime
  const duration = audio.duration
  const currentTimeMinutes = Math.floor(currentTime / 60)
  const currentTimeSeconds = Math.floor(currentTime % 60)
  const durationMinutes = Math.floor(duration / 60)
  const durationSeconds = Math.floor(duration % 60)

  timeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds
    .toString()
    .padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`

  progressBar.value = (currentTime / duration) * 100
})

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration
  audio.currentTime = seekTime
})

muteButton.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false
    muteButton.innerHTML = "<i class='fa-solid fa-volume-high'></i>"
  } else {
    audio.muted = true
    muteButton.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>"
  }
})

volumeInput.addEventListener('input', () => {
  const volume = volumeInput.value / 100
  audio.volume = volume

  if (volume === 0) {
    muteButton.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>"
  } else if (volume <= 0.5) {
    muteButton.innerHTML = "<i class='fa-solid fa-volume-low'></i>"
  } else {
    muteButton.innerHTML = "<i class='fa-solid fa-volume-high'></i>"
  }
})

audio.addEventListener('ended', () => {
  playPauseButton.classList.remove('pause')
  pauseOverlay.classList.remove("active")
  playPauseButton.classList.add('play')
  playPauseButton.setAttribute("title", "play")
  playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>"
  handleRepeatInteractionState();
  isPlaying = false
})

albumCover.addEventListener("click", () => {
  playlist.classList.remove("active")
  currentSong.classList.remove("hidden")
  controls.classList.remove("hidden")
  if (!isPlaying) {
    audio.play()
    playPauseButton.classList.remove('play')
    playPauseButton.classList.add('pause')
    playPauseButton.setAttribute("title", "pause")
    pauseOverlay.classList.remove("active")
    playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>"
    isPlaying = true
  } else {
    audio.pause()
    playPauseButton.classList.remove('pause')
    pauseOverlay.classList.add("active")
    playPauseButton.classList.add('play')
    playPauseButton.setAttribute("title", "play")
    playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>"
    isPlaying = false
  }
})

playlistBtn.addEventListener("click", () => {
  playlist.classList.toggle("active")
  currentSong.classList.toggle("hidden")
  controls.classList.toggle("hidden")
})


playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    playSong(index)
    const audioFile = item.getAttribute('data-audio-file')

    audio.src = audioFile

    audio.play()

    currentSong.textContent = `Now Playing: ${item.textContent}`

    albumCover.src = item.getAttribute("data-image-file")

    playlist.classList.remove('active')
    currentSong.classList.remove('hidden')
    controls.classList.remove('hidden')

    playPauseButton.classList.remove('play')
    playPauseButton.classList.add('pause')
    playPauseButton.setAttribute("title", "pause")
    playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>"
    pauseOverlay.classList.remove("active")
    isPlaying = true
  })
})

document.querySelector('.previous').addEventListener('click', () => {
  playPreviousSong()
})


// Modifies the state of musicListeningState

/* 


 state 1 = goes to next song 
 state 2 = song on repeat
 state 3 = playlist on repeat


*/
repeatButton.addEventListener("click", () => {
  ++musicListeningState;
  console.log(musicListeningState);
  if(musicListeningState === 1){
    // display icon
    return;
  } else if(musicListeningState === 2){
    // display icon
    return;
  } else if(musicListeningState === 3){
    // display icon
    return;
  }
  return musicListeningState = 0;
})

document.querySelector('.next').addEventListener('click', () => {
  playNextSong()
})

repeatCheckbox.addEventListener('change', () => {
  isRepeat = repeatCheckbox.checked;
})