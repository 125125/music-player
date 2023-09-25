# music-player
Custom Music Player by Tok124

## Features
* Play Button
* Pause Button
* Next Song Button
* Previous Song Button
* Mute Volume Button
* Volume Range Slider
* Repeat Song or playlist Button
* Toggle Playlist Button
* Upload Button to toggle modal
* Displays current time + song length
* Draggable Progress Bar
* Plays next song automatically when a song ends
* Changes Album Cover automatically when switching songs
* Drag n' Drop File Upload
* Supports multiple file uploads

## Repeat Button
Click once to activate Repeat Song (Blue Icon)<br>
Click Twice to activate Repeat Playlist (Red Icon)<br>
Gray Icon = No Repeat

## How to use
1. edit config.php to match your database login credentials
2. import SQL/songsDB.sql to your database, it should create musicplayer database + songs table
3. Done ! You should now be able to open your web browser and navigate to the website

## Recommended Browsers
* Chrome
* Microsoft Edge

## Known Issues
* Volume Range Slider is not working so great in firefox (Will be fixed soon)
* Playlist repeats even if repeat playlist button is not active
* Sometimes you have to click twice or more to pause song (can click pause button or on album cover, same issues on both)

## Languages Used
* HTML
* SCSS
* JavaScript
* php
* MySQL

## Credits
**Alexander** - Working on JavaScript<br>
**Tok124/125125/me** - Working on HTML + SCSS (And some of the php code)<br>
**ChatGPT** - Has helped me to make the things i can't do by myself in php