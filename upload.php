<?php
require_once 'getID3/getid3/getid3.php';
include("config/config.php");

$targetDirectory = "playlist/";
$maxFileSize = 20 * 1024 * 1024;
$allowedExtensions = ["mp3"];

if (!file_exists($targetDirectory)) {
    mkdir($targetDirectory, 0777, true);
}

$uploadedFile = $_FILES['mp3_file']['tmp_name'];
$fileName = basename($_FILES['mp3_file']['name']);
$targetFile = $targetDirectory . uniqid() . '_' . $fileName;

if ($_FILES['mp3_file']['size'] > $maxFileSize) {
    die("File is too large.");
}

$extension = pathinfo($fileName, PATHINFO_EXTENSION);
if (!in_array(strtolower($extension), $allowedExtensions)) {
    die("Invalid file type.");
}

if (move_uploaded_file($uploadedFile, $targetFile)) {
    $getID3 = new getID3();
    $fileInfo = $getID3->analyze($targetFile);

    if (isset($fileInfo['comments']['picture'][0]['data'])) {
        $coverImageData = $fileInfo['comments']['picture'][0]['data'];
        $coverFileName = "images/" . uniqid() . '.jpg';

        file_put_contents($coverFileName, $coverImageData);
    }

    $songname = str_replace(".mp3", "", $fileName);
    $stmt = $conn->prepare("INSERT INTO songs (`name`, `file`, `image`) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $songname, $targetFile, $coverFileName);
    if($stmt->execute()) {
        echo "Song has been added to the playlist.";
    } else {
        echo "Unable to insert the song into the database. " . $stmt->error;
        unlink($targetFile);
    }
} else {
    echo "Upload failed.";
}
?>
