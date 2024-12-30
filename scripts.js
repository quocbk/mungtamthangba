const songs = [
    {
        name: "Mùng Tám Tháng Ba",
        path: "mungtamthangba.mp3",
        image: "image.jpg",
    },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".song-name");
const boxDisk = document.querySelector(".box-disk");
const currentTimeEl = document.querySelector(".current-time");
const musicTimeEl = document.querySelector(".music-time");
const btnPlay = document.querySelector(".btn-play");

function loadSong(song) {
    audio.src = song.path;
    songName.textContent = song.name;
    boxDisk.style.backgroundImage = `url(${song.image})`;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        btnPlay.textContent = "⏸";
        boxDisk.classList.add("play");
    } else {
        audio.pause();
        btnPlay.textContent = "⏯";
        boxDisk.classList.remove("play");
    }
}

audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    if (!isNaN(durationMinutes) && !isNaN(durationSeconds)) {
        musicTimeEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
    }
});

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});

btnPlay.addEventListener("click", playPauseSong);

document.querySelector(".btn-next").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

document.querySelector(".btn-back").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

// Initialize
loadSong(songs[currentSongIndex]);
