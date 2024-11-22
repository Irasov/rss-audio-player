const songsJSON = `[
    {
        "nameGroup": "Adventure Time",
        "nameSong": "Island Song",
        "img": "assets/img/aventure.webp",
        "song": "assets/audio/AdventureTime.mp3",
        "time": "108"
    },
    {
        "nameGroup": "Gravity Falls",
        "nameSong": "Main Theme",
        "img": "assets/img/gravity.webp",
        "song": "assets/audio/GravityFalls.mp3",
        "time": "40"
    },
    {
        "nameGroup": "Death Note",
        "nameSong": "Main Theme",
        "img": "assets/img/note.webp",
        "song": "assets/audio/DeathNotes.mp3",
        "time": "184"
    }
  ]`;

let player = document.querySelector(".audio");
let audioPlayer = document.querySelector(".audio-player");
let title = document.querySelector(".player__title");
const playPause = document.querySelector(".button__play-pause");
const wrapperBg = document.querySelector(".wrapper__bg");
const playerImg = document.querySelector(".player__img");
const playerTitle = document.querySelector(".player__mult-title");
const playerSubtitle = document.querySelector(".player__song-title");
let progressPlayer = document.querySelector(".progress-player");
let minutesSong = document.querySelector(".player__minutes");
let secondsSong = document.querySelector(".player__seconds");
let currentMinutesSong = document.querySelector(".player__current-minutes");
let currentSecondsSong = document.querySelector(".player__current-seconds");
let currentTime = 0;
let songs = JSON.parse(songsJSON);
let currentSong = 0;

function checkPlaying(){
    if (playPause.classList.contains("_playing")){
        playPause.classList.toggle("_playing");
        playPause.classList.toggle("_play");
        playPause.classList.toggle("_pause");
        playerImg.classList.toggle("_scale");
        player.pause();     
    }
};

function secToMin(seconds){
    let timeSongs = [];
    let str ="";
    if(String(Math.trunc(seconds / 60)).length == 1) {
        timeSongs.push(str = '0' + String(Math.trunc(seconds / 60)));
    } else {
        timeSongs.push(Math.trunc(seconds / 60));
    }
    if(String(Math.trunc(seconds % 60)).length == 1) {
        timeSongs.push(str = '0' + String(Math.trunc(seconds % 60)));
    } else {
        timeSongs.push(Math.trunc(seconds % 60));
    }
    return timeSongs;
}

function moveProgress() {
    const value = progressPlayer.value;
    let procents = (value * 100) / progressPlayer.max; 
    progressPlayer.style.background = `linear-gradient(to right, rgba(28,39,76,0.5) 0%, rgba(28,39,76,0.5) ${procents}%, #fff ${procents}%, white 100%)`;
    let secMin = secToMin(progressPlayer.value);
    currentMinutesSong.innerHTML = secMin[0];
    currentSecondsSong.innerHTML = secMin[1];
}

function changeSong(numberSong) {
    let secMin = secToMin(+songs[numberSong].time);
    checkPlaying();
    progressPlayer.max = songs[numberSong].time;
    progressPlayer.value = 0;
    moveProgress();
    minutesSong.innerHTML = secMin[0];
    secondsSong.innerHTML = secMin[1];
    wrapperBg.src = songs[numberSong].img;
    playerImg.src = songs[numberSong].img;
    let el = document.createElement("div");
    el.classList = 'audioPlayer';
    el.innerHTML = `
    <audio class="audio">
        <source src="${songs[numberSong].song}"  type="audio/mp3">
    </audio> 
    `;
    audioPlayer.replaceWith(el);
    audioPlayer = el;
    player = document.querySelector(".audio");
    el = document.createElement('div');
    el.classList = 'player__title';
    el.innerHTML=`
    <span class="player__mult-title">${songs[numberSong].nameGroup}</span>
    <span> - </span>
    <span class="player__song-title">${songs[numberSong].nameSong}</span>
    `;
    title.replaceWith(el);
    title = el;

}

function clickPlayPause(targetElement) {
    if(targetElement.classList.contains("_play")){
        
        player.currentTime = currentTime;
        player.play();
        playPause.classList.toggle("_play");
        playPause.classList.toggle("_pause");
        playPause.classList.toggle("_playing");
        playerImg.classList.toggle("_scale");
        player.addEventListener('timeupdate', function(){
            progressPlayer.value = Math.round(player.currentTime);
            moveProgress();
        })
    } else if(targetElement.classList.contains("_pause")){
        playPause.classList.toggle("_play");
        playPause.classList.toggle("_pause");
        playPause.classList.toggle("_playing");
        playerImg.classList.toggle("_scale");
        player.pause();
        currentTime = player.currentTime;
    }
}

document.addEventListener('click', e => {
    const targetElement = e.target;
    if(targetElement.classList.contains("button__play-pause")){
        clickPlayPause(targetElement);
    }
    if(targetElement.classList.contains("button__backward")){
        if(currentSong === 0) {
            currentSong = 2;
            currentTime = 0;
            changeSong(currentSong);
        } else {
            currentSong -= 1;
            currentTime = 0;
            changeSong(currentSong);
        }
    }
    if(targetElement.classList.contains("button__forward")){
        if(currentSong === 2) {
            currentSong = 0;
            currentTime = 0;
            changeSong(currentSong);
        } else {
            currentSong += 1;
            currentTime = 0;
            changeSong(currentSong);
        }
    }
});

progressPlayer.addEventListener('input', function() {
    moveProgress();
    currentTime = progressPlayer.value;
    player.currentTime = progressPlayer.value;
});
progressPlayer.addEventListener('change', function() {
    currentTime = progressPlayer.value;
    player.currentTime = progressPlayer.value;
});


changeSong(currentSong);
