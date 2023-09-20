<?php
include("config/config.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="scss/main.css">
</head>
<body>
  <audio src="playlist/650661362a28b_Architects - Hereafter.mp3"></audio>
  <div class="wrapper">
    <form action="upload.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="mp3_file" accept=".mp3">
      <input type="submit" value="Upload Song">
    </form>
    <div class="music-player"><img class="album" src="images/650661362e156.jpg" alt="album" />
      <div class="playlist">
        <ul>
          <?php
            $stmt = $conn->prepare("SELECT * FROM songs");
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                echo "<li data-audio-file='{$row['file']}' data-image-file='{$row['image']}'>{$row['name']}</li>";
              }
            }
          ?>
        </ul>
      </div>
      <div class="current-song">Now Playing: Architects - Hereafter</div>
      <div class="pause-overlay fa-solid fa-pause"></div>
      <div class="controls">
        <div class="progress">
          <input class="bar" type="range" value="0" />
          <div class="time">00:00 / 00:00</div>
        </div>
        <div class="buttons">
          <button class="playstate play" type="button" title="play"><i class="fa-solid fa-play"></i></button>
          <button class="stop" type="button" title="stop"><i class="fa-solid fa-stop"></i></button>
          <button class="previous" title="Previous Song"><i class="fa-solid fa-backward-fast"></i></button>
          <button class="next" title="Next Song"><i class="fa-solid fa-forward-fast"></i></button>
          <button class="repeat" title="Repeat Song"><i class="fa-solid fa-repeat"></i></button>
          <button class="playlist-btn" type="button" title="playlist"><i class="fa-solid fa-list"></i></button>
          <div class="volume-control">
            <button class="mute" type="button" title="mute"><i class="fa-solid fa-volume-high"></i></button>
            <div class="volume-input">
              <input class="volume" type="range" value="100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="https://kit.fontawesome.com/a7731f7ef8.js"></script>
  <script src="js/music-player.js"></script>
</body>
</html>