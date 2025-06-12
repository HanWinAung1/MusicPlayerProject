
let songs = [
  {
    song:'American Pie',
    path:'music/Don McLean - American Pie.mp3',
    artist: 'Don McLean',
    cover: 'cover/Don_McLean_-_American_Pie_(album)_Coverart.png'
  },
  {
    song:'The Gambler',
    path: 'music/The Gambler.m4a',
    artist: 'Kenny Roger',
    cover: 'cover/TheGamblerAlbumCover.jpg'
  },
  {
    song:'Sims',
    path: 'music/Lauv_-_Sims.m4a',
    artist: 'Lauv',
    cover: 'cover/artworks-N2eUmCIsM9uL-0-t500x500.jpg'
  },
  {
    song:'A Different Way',
    path: 'music/DJ Snake Lauv  A Different Way.mp3',
    artist: 'DJ Snake ft. Lauv',
    cover:'cover/DJ_Snake_A_Different_Way.png'
  },
  {
    song:'Stairway to Heaven',
    path:'music/Led Zeppelin  Stairway To Heaven.mp3',
    artist: 'Led Zeppelin',
    cover: 'cover/stairwaytoheaven.jpg'
  },
  {
    song:'Never Gonna Give You Up',
    path:'music/Rick Astley  Never Gonna Give You Up.mp3',
    artist:'Rick Astley',
    cover:'cover/RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg'
  }
];
let songtitle = document.getElementById("songtitle");
let artistName = document.getElementById("artist");
const list = document.querySelector("#list");
let audio1 = document.getElementById("myAudio");
let playbtn = document.getElementById("playbtn");

for(let i = 0; i<songs.length;i++){
  let div = document.createElement("div");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let title = songs[i].song;
  let artist = songs[i].artist;
  p1.append(title);
  p2.append(artist);
  div.append(p1);
  div.append(p2);
  div.setAttribute("id",i);
  div.classList.add('song');
  list.append(div);
  if(i==0){
    div.classList.add("selected");
    div.style.marginTop = "10%";
    audio1.src = songs[i].path;
    songtitle.innerHTML = songs[i].song;
  artistName.innerHTML = songs[i].artist;
  }
}
// main song index
let mainSongIndex=0;

let songList = document.querySelectorAll('.song');
songList.forEach((music,index)=>{
  music.addEventListener('click',()=>{
    mainSongIndex= index;
    selectSong(mainSongIndex);
    // console.log(index)
  })
});
function playFun(){
  var playPromise = audio1.play();
  if(playbtn.checked){
    if(playPromise !== undefined){
      playPromise.then(_=>{
      })
      .catch(error=>{
        console.log(error);
      });
    }
    console.log('playing music')
  }else{
    if(playPromise !== undefined){
      playPromise.then(_=>{
        audio1.pause();
      })
      .catch(error=>{
        console.log(error);
      });
    }
    console.log('stopped')
  }
} 
playbtn.addEventListener('change',playFun);
document.addEventListener('keyup',(event)=>{
  if(event.code==='Space'){
    if(playbtn.checked){
      playbtn.checked = false;
      playFun();
    }else{
      playbtn.checked = true;
      playFun();
    }
  }
  animateDisc()
});
function selectSong(mainSongIndex){
  songtitle.innerHTML = songs[mainSongIndex].song;
 artistName.innerHTML = songs[mainSongIndex].artist;
  songList[mainSongIndex].classList.add("selected");
  if(playbtn.checked){
    playbtn.checked = false;
    playFun();
  }
    audio1.src = songs[mainSongIndex].path;
    playbtn.checked = true;
    setTimeout(function () {      
      playFun();
   }, 150);
    
  for(let i =0; i<songList.length;i++){
    if(i!=mainSongIndex){
        songList[i].classList.remove("selected");
      }
  }
  audio1.src = songs[mainSongIndex].path;
  if(themeInputCollection[themeInputCollection.length-1].checked){
  changeImg();
  }else{
    
  }
  // audio1.play();
}

//For repeat,random and loop buttons
const repeatbtn = document.getElementById("repeatbtn");
const randombtn = document.getElementById("randombtn");
const loopbtn = document.getElementById("loopbtn");
function playNext(){
  if(loopbtn.checked){
    mainSongIndex++;
    if(mainSongIndex== songs.length){
      mainSongIndex = 0;
      selectSong(mainSongIndex);
    }else{
      selectSong(mainSongIndex);
    }
  }else if(repeatbtn.checked){
    selectSong(mainSongIndex);
  }else if(randombtn.checked){
    let max = songs.length - 1;
    let min = 0;
    mainSongIndex=  Math.floor(Math.random() * (max - min + 1) ) + min;
    selectSong(mainSongIndex);
  }
  if(selectedTheme!=0){
    changeImg()
  }
  animateDisc()
}
function playPrevious(){
  if(loopbtn.checked){
    if(mainSongIndex== 0){
      mainSongIndex = songs.length-1;
      selectSong(mainSongIndex);
    }else{
      mainSongIndex--;
      selectSong(mainSongIndex);
    }
  }else if(repeatbtn.checked){
    selectSong(mainSongIndex);
  }else if(randombtn.checked){
    let max = songs.length - 1;
    let min = 0;
    mainSongIndex=  Math.floor(Math.random() * (max - min + 1) ) + min;
    selectSong(mainSongIndex);
  }
  if(selectedTheme!=0){
    changeImg()
  }
  animateDisc()
}
//if the song ended;
  audio1.addEventListener("ended",playNext);
//for next button
const nextbtn = document.getElementById("next");
nextbtn.addEventListener("click",playNext);
//for previous button
const previousbtn = document.getElementById("previous");
previousbtn.addEventListener("click",playPrevious);


const probar = document.getElementById('progressbar')

audio1.onloadedmetadata = function(){
  probar.max= audio1.duration;
  probar.value= audio1.currentTime;
}
if(audio1.play){
  setInterval(()=>{
    probar.value= audio1.currentTime;
  },500)
}
probar.onchange = ()=>{
  playbtn.checked= true;
  audio1.play();
  audio1.currentTime= probar.value;
}
//for theme3

