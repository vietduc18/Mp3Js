const songs = [
  {
    name: "đi theo bóng mặt trời",
    singer: "Đen, Tăng Ngân Hà",
    path: "./music/Ditheobongmattroi.mp3",
    img: "./img/OIP.jpg",
  },

  {
    name: "shadown of the sun",
    singer: "Ẩn danh",
    path: "./music/Shadow of the sun.mp3",
    img: "./img/OIP (1).jpg",
  },

  {
    name: "bộ tộc cùng già",
    singer: "thiện hưng",
    path: "./music/Bo toc cung gia.mp3",
    img: "./img/OIP (2).jpg",
  },
];

let $img = $(".mp3-img");
let $songName = $(".mp3-title");
let $singer = $(".mp3-singer-name");
let $audio = $("#audio");
let $progress = $("#progress");
let $body = $("body");
let currentIndex = 0;

function renderMusic(index) {
  $songName.text(`${songs[index].name}`);
  $singer.text(`${songs[index].singer}`);
  $img.attr("src", `${songs[index].img}`);
  $audio.attr("src", `${songs[index].path}`);
  $progress.value = 0;
}

renderMusic(currentIndex);

let $shuffle = $(".btn-random");
$shuffle.on("click", function () {
  console.log("đang phát");
});

const $btnPlay = $(".btn-play");
const $btnPause = $(".btn-play-pause");
let $nextBtn = $(".btn-next");
let $prevBtn = $(".btn-prev");

// play
$btnPlay.on("click", function (e) {
  $audio.get(0).play();
  $btnPlay.addClass("display_none");
  $btnPause.removeClass("display_none");
});

// Pause
$btnPause.on("click", function (e) {
  $audio.get(0).pause();
  $btnPause.addClass("display_none");
  $btnPlay.removeClass("display_none");
});

// Next
$nextBtn.on("click", function () {
  if ($shuffle.hasClass("active")) {
    let lastRandom = null;
    currentIndex = Math.floor(Math.random() * songs.length);
    while (currentIndex == lastRandom) {
      currentIndex = Math.floor(Math.random() * songs.length);
    }
    renderMusic(currentIndex);
    $audio.get(0).play();
  } else {
    currentIndex += 1;
    if (currentIndex > songs.length - 1) {
      currentIndex = 0;
      renderMusic(currentIndex);
    }
  }

  renderMusic(currentIndex);

  $audio.get(0).play();
  $btnPlay.addClass("display_none");
  $btnPause.removeClass("display_none");
});

// Previous
$prevBtn.on("click", function () {
  if ($shuffle.hasClass("active")) {
    let lastRandom = null;
    currentIndex = Math.floor(Math.random() * songs.length);
    while (currentIndex == lastRandom) {
      currentIndex = Math.floor(Math.random() * songs.length);
    }
    renderMusic(currentIndex);
    $audio.get(0).play();
  } else {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = songs.length - 1;
      renderMusic(currentIndex);
    }
  }

  renderMusic(currentIndex);
  $audio.get(0).play();
  $btnPlay.addClass("display_none");
  $btnPause.removeClass("display_none");
});

// Rewind
$progress.on("change", function (e) {
  let songDuration = $audio.get(0).duration;
  let rewindTime = (songDuration * e.target.value) / 100;
  $audio.get(0).currentTime = rewindTime;
  console.log(rewindTime);
});

// Progress audio
$audio.on("timeupdate", function () {
  let progressPercent = Math.floor(
    ($audio.get(0).currentTime / $audio.get(0).duration) * 100
  );
  $progress.value = progressPercent;
});

// volume
$audio.prop("volume", 1);
let $volume = $("#volume");

$volume.on("change", function (e) {
  let volumeDuration = e.target.value / 100;

  $audio.prop("volume", volumeDuration);
  console.log(volumeDuration);
});
