import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
const durationElement = document.querySelector('.whole-track');
const currentTimeElement = document.querySelector('.timecode');
const play = document.querySelector('.play');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const volumeRange = document.querySelector('.volume-range');
const volumeLogo = document.querySelector('.volume-image');
const repeatBtn = document.querySelector('.repeat');
const randomBtn = document.querySelector('.random');
const playlistBtn = document.querySelector('.playlist');


let volumeAmount = 0.5;
let currentTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
let onRepeat = false;
let onRandom = false;

const trackArray = [{
        name: 'Childish Gambino - Sober',
        src: './assets/audio/ChildishGambino-Sober.mp3'
    },
    {
        name: 'Future - Mask Off(Lo-Fi)',
        src: './assets/audio/Future-maskoff(lofi).mp3'
    },
    {
        name: 'Roddy Ricch - The box(Lo-Fi)',
        src: './assets/audio/roddyricch-thebox(lofi).mp3'
    },
    {
        name: 'XXXTENTACION - Hope(Lo-Fi)',
        src: './assets/audio/XXXTENTACION-Hope(lofi).mp3'
    },
    {
        name: 'XXXTENTACION - SAD!(Lo-Fi)',
        src: './assets/audio/XXXTENTACION-SAD!(lofi).mp3'
    }
];

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4C4C4C',
    progressColor: '#838383',
    url: trackArray[currentTrackIndex].src,
    dragToSeek: true
})

const saveLocalStorage = () => {
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
}

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

const playPause = () => {
    if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        play.innerHTML = `<path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" stroke-width="2" stroke-linejoin="round"/>`
    } else {
        play.innerHTML = `<path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
        wavesurfer.setVolume(volumeAmount);
        wavesurfer.play();
    }
}

const previousTrack = async () => {
    if (onRepeat === false) currentTrackIndex--;
    if (currentTrackIndex < 0) currentTrackIndex = trackArray.length - 1;

    await wavesurfer.load(trackArray[currentTrackIndex].src);
    playPause();
    saveLocalStorage();
}

const nextTrack = async () => {

    if (onRepeat === false && onRandom === false) currentTrackIndex++;
    if (onRandom === true) currentTrackIndex = Math.floor(Math.random() * trackArray.length);
    if (currentTrackIndex > trackArray.length - 1) currentTrackIndex = 0;

    await wavesurfer.load(trackArray[currentTrackIndex].src);
    playPause();
    saveLocalStorage();
}

const volumeChange = () => {
    if (+volumeRange.value === 0) volumeLogo.innerHTML = `<path d="M10.0012 8.99984H9.1C8.53995 8.99984 8.25992 8.99984 8.04601 9.10883C7.85785 9.20471 7.70487 9.35769 7.60899 9.54585C7.5 9.75976 7.5 10.0398 7.5 10.5998V13.3998C7.5 13.9599 7.5 14.2399 7.60899 14.4538C7.70487 14.642 7.85785 14.795 8.04601 14.8908C8.25992 14.9998 8.53995 14.9998 9.1 14.9998H10.0012C10.5521 14.9998 10.8276 14.9998 11.0829 15.0685C11.309 15.1294 11.5228 15.2295 11.7143 15.3643C11.9305 15.5164 12.1068 15.728 12.4595 16.1512L15.0854 19.3023C15.5211 19.8252 15.739 20.0866 15.9292 20.1138C16.094 20.1373 16.2597 20.0774 16.3712 19.9538C16.5 19.811 16.5 19.4708 16.5 18.7902V5.20948C16.5 4.52892 16.5 4.18864 16.3712 4.04592C16.2597 3.92233 16.094 3.86234 15.9292 3.8859C15.7389 3.9131 15.5211 4.17451 15.0854 4.69733L12.4595 7.84843C12.1068 8.27166 11.9305 8.48328 11.7143 8.63542C11.5228 8.77021 11.309 8.87032 11.0829 8.93116C10.8276 8.99984 10.5521 8.99984 10.0012 8.99984Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    if (+volumeRange.value < 50 && +volumeRange.value !== 0) volumeLogo.innerHTML = `<path d="M18 9.00009C18.6277 9.83575 18.9996 10.8745 18.9996 12.0001C18.9996 13.1257 18.6277 14.1644 18 15.0001M6.6 9.00009H7.5012C8.05213 9.00009 8.32759 9.00009 8.58285 8.93141C8.80903 8.87056 9.02275 8.77046 9.21429 8.63566C9.43047 8.48353 9.60681 8.27191 9.95951 7.84868L12.5854 4.69758C13.0211 4.17476 13.2389 3.91335 13.4292 3.88614C13.594 3.86258 13.7597 3.92258 13.8712 4.04617C14 4.18889 14 4.52917 14 5.20973V18.7904C14 19.471 14 19.8113 13.8712 19.954C13.7597 20.0776 13.594 20.1376 13.4292 20.114C13.239 20.0868 13.0211 19.8254 12.5854 19.3026L9.95951 16.1515C9.60681 15.7283 9.43047 15.5166 9.21429 15.3645C9.02275 15.2297 8.80903 15.1296 8.58285 15.0688C8.32759 15.0001 8.05213 15.0001 7.5012 15.0001H6.6C6.03995 15.0001 5.75992 15.0001 5.54601 14.8911C5.35785 14.7952 5.20487 14.6422 5.10899 14.4541C5 14.2402 5 13.9601 5 13.4001V10.6001C5 10.04 5 9.76001 5.10899 9.54609C5.20487 9.35793 5.35785 9.20495 5.54601 9.10908C5.75992 9.00009 6.03995 9.00009 6.6 9.00009Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    if (+volumeRange.value > 50) volumeLogo.innerHTML = `<path d="M16.0004 9.00009C16.6281 9.83575 17 10.8745 17 12.0001C17 13.1257 16.6281 14.1644 16.0004 15.0001M18 5.29177C19.8412 6.93973 21 9.33459 21 12.0001C21 14.6656 19.8412 17.0604 18 18.7084M4.6 9.00009H5.5012C6.05213 9.00009 6.32759 9.00009 6.58285 8.93141C6.80903 8.87056 7.02275 8.77046 7.21429 8.63566C7.43047 8.48353 7.60681 8.27191 7.95951 7.84868L10.5854 4.69758C11.0211 4.17476 11.2389 3.91335 11.4292 3.88614C11.594 3.86258 11.7597 3.92258 11.8712 4.04617C12 4.18889 12 4.52917 12 5.20973V18.7904C12 19.471 12 19.8113 11.8712 19.954C11.7597 20.0776 11.594 20.1376 11.4292 20.114C11.239 20.0868 11.0211 19.8254 10.5854 19.3026L7.95951 16.1515C7.60681 15.7283 7.43047 15.5166 7.21429 15.3645C7.02275 15.2297 6.80903 15.1296 6.58285 15.0688C6.32759 15.0001 6.05213 15.0001 5.5012 15.0001H4.6C4.03995 15.0001 3.75992 15.0001 3.54601 14.8911C3.35785 14.7952 3.20487 14.6422 3.10899 14.4541C3 14.2402 3 13.9601 3 13.4001V10.6001C3 10.04 3 9.76001 3.10899 9.54609C3.20487 9.35793 3.35785 9.20495 3.54601 9.10908C3.75992 9.00009 4.03995 9.00009 4.6 9.00009Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`

    volumeAmount = +volumeRange.value / 100;
    wavesurfer.setVolume(volumeAmount);
}

const muteVolume = () => {
    wavesurfer.setVolume(0);
    volumeRange.value = 0;
    volumeLogo.innerHTML = `<path d="M10.0012 8.99984H9.1C8.53995 8.99984 8.25992 8.99984 8.04601 9.10883C7.85785 9.20471 7.70487 9.35769 7.60899 9.54585C7.5 9.75976 7.5 10.0398 7.5 10.5998V13.3998C7.5 13.9599 7.5 14.2399 7.60899 14.4538C7.70487 14.642 7.85785 14.795 8.04601 14.8908C8.25992 14.9998 8.53995 14.9998 9.1 14.9998H10.0012C10.5521 14.9998 10.8276 14.9998 11.0829 15.0685C11.309 15.1294 11.5228 15.2295 11.7143 15.3643C11.9305 15.5164 12.1068 15.728 12.4595 16.1512L15.0854 19.3023C15.5211 19.8252 15.739 20.0866 15.9292 20.1138C16.094 20.1373 16.2597 20.0774 16.3712 19.9538C16.5 19.811 16.5 19.4708 16.5 18.7902V5.20948C16.5 4.52892 16.5 4.18864 16.3712 4.04592C16.2597 3.92233 16.094 3.86234 15.9292 3.8859C15.7389 3.9131 15.5211 4.17451 15.0854 4.69733L12.4595 7.84843C12.1068 8.27166 11.9305 8.48328 11.7143 8.63542C11.5228 8.77021 11.309 8.87032 11.0829 8.93116C10.8276 8.99984 10.5521 8.99984 10.0012 8.99984Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
}

const repeatTrack = () => {
    onRandom = false;
    randomBtn.classList.remove('active');
    repeatBtn.classList.toggle('active');
    onRepeat = !onRepeat;
}

const randomTrack = () => {
    onRepeat = false;
    repeatBtn.classList.remove('active');
    randomBtn.classList.toggle('active');
    onRandom = !onRandom;
}

const changeTime = () => {
    const currentTime = wavesurfer.getCurrentTime();
    currentTimeElement.textContent = formatTime(currentTime);
}

const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const playListRender = (playlistContainer) => {
    const ul = document.createElement('ul');
    ul.classList.add('playlist__list');

    let currentPlaylist = [...trackArray].splice(currentTrackIndex + 1, trackArray.length - 1);

    currentPlaylist.length === 0 ? currentPlaylist = [...trackArray].slice(0, -1) : currentPlaylist

    if (onRandom) currentPlaylist = shuffle(currentPlaylist);

    currentPlaylist.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('playlist__item');
        li.innerHTML = `<span class="playlist__name">${item.name}</span>
        <hr />`;
        ul.append(li);

        const index = trackArray.indexOf(item);

        li.addEventListener('click', async () => {
            playListShow();
            currentTrackIndex = index;

            await wavesurfer.load(trackArray[currentTrackIndex].src);
            playPause();
            saveLocalStorage();
        })
    })

    playlistContainer.append(ul);
}

const playListShow = () => {
    const playlistContainer = document.querySelector('.playlist-container');
    playlistContainer.classList.toggle('active');
    playlistBtn.classList.toggle('active');
    playlistBtn.classList.contains('active') ? playListRender(playlistContainer) : playlistContainer.querySelector('ul').remove();
}

wavesurfer.on('ready', () => {
    const duration = wavesurfer.getDuration();
    const currentTime = wavesurfer.getCurrentTime();

    durationElement.textContent = formatTime(duration);
    currentTimeElement.textContent = formatTime(currentTime);

    play.addEventListener('click', playPause);

    previousBtn.addEventListener('click', previousTrack);

    nextBtn.addEventListener('click', nextTrack);

    volumeRange.addEventListener('input', volumeChange);

    volumeLogo.addEventListener('click', muteVolume);

    repeatBtn.addEventListener('click', repeatTrack);

    randomBtn.addEventListener('click', randomTrack);

    playlistBtn.addEventListener('click', playListShow);

    wavesurfer.on('audioprocess', changeTime);

    wavesurfer.on('seeking', changeTime);

    wavesurfer.on('finish', nextTrack);
})