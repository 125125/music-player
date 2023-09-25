<?php
require_once 'getID3/getid3/getid3.php';
include("config/config.php");

$targetDirectory = "playlist/";
$maxFileSize = 20 * 1024 * 1024;
$allowedExtensions = ["mp3"];
$placeholderImage = "images/placeholder.jpg";

if (!file_exists($targetDirectory)) {
    mkdir($targetDirectory, 0777, true);
}

// Check if files were uploaded
if(isset($_FILES['mp3_files'])) {
    $uploadCount = count($_FILES['mp3_files']['name']);

    for($i = 0; $i < $uploadCount; $i++) {
        $uploadedFile = $_FILES['mp3_files']['tmp_name'][$i];
        $fileName = $_FILES['mp3_files']['name'][$i];

        // Check if the file field is empty or has no name
        if (empty($fileName) || $_FILES['mp3_files']['error'][$i] == UPLOAD_ERR_NO_FILE) {
            echo "File $i is empty. Skipping.<br>";
            continue;
        }

        $targetFile = $targetDirectory . uniqid() . '_' . $fileName;

        if ($_FILES['mp3_files']['size'][$i] > $maxFileSize) {
            echo "File '$fileName' is too large. Skipping.<br>";
            continue;
        }

        $extension = pathinfo($fileName, PATHINFO_EXTENSION);
        if (!in_array(strtolower($extension), $allowedExtensions)) {
            echo "Invalid file type for '$fileName'. Skipping.<br>";
            continue;
        }

        if (move_uploaded_file($uploadedFile, $targetFile)) {
            $getID3 = new getID3();
            $fileInfo = $getID3->analyze($targetFile);

            if (isset($fileInfo['comments']['picture'][0]['data'])) {
                $coverImageData = $fileInfo['comments']['picture'][0]['data'];
                $coverFileName = "images/" . uniqid() . '.jpg';

                file_put_contents($coverFileName, $coverImageData);
            }else{
                $coverFileName = $placeholderImage;
            }

            $songname = str_replace(".mp3", "", $fileName);
            $stmt = $conn->prepare("INSERT INTO songs (`name`, `file`, `image`) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $songname, $targetFile, $coverFileName);
            if($stmt->execute()) {
                echo "Song '$songname' has been added to the playlist.<br>";
            } else {
                echo "Unable to insert the song '$songname' into the database. " . $stmt->error . "<br>";
                unlink($targetFile);
            }
        } else {
            echo "Upload of '$fileName' failed.<br>";
        }
    }
}
?>