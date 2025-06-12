const themebtn = document.getElementById('themebtn')
const themeslistContainer =  document.querySelector('.themeslist')
const themeLabelEles  = document.querySelectorAll('[data-theme-input]')
themebtn.addEventListener('change', ()=>{
  themeslistContainer.classList.toggle('showlist')
})

const themeInputCollection = document.getElementsByName('themes');

let selectedTheme=0; //////////////////////// main theme index

themeInputCollection.forEach((themeInputchkbox,index) =>{
  themeInputchkbox.addEventListener('change',()=>{
    if(index == selectedTheme){
      themeslistContainer.classList.remove('showlist')
    }
    else{
      if(themeInputchkbox.checked){
        selectedTheme= index
        themeslistContainer.classList.remove('showlist')
        changeThemeLabelColor()
      }
    }

  })
})
changeThemeLabelColor()
function changeThemeLabelColor(){
  themeLabelEles[0].style.color = "black";
  themeLabelEles[1].style.color = "black";
  themeLabelEles[2].style.color = "black";
  themeInputCollection.forEach((themeinput)=>{
    if(themeinput.checked){
      themeLabelEles[selectedTheme].style.color = "blue";
    }
  })
}
//for theme three
let theme = document.getElementById("theme");
function changeImg(){
  theme.style.backgroundImage = "url('" + songs[mainSongIndex].cover + "')";
}
themeInputCollection[0].onchange= ()=>{
  theme.style.backgroundImage = "url('theme/night.jpg')";
  let children = theme.children;
  for(let i= 0; i<children.length;i++){
    children[i].style.display = "block";
  }
  removeDisc()
}
themeInputCollection[themeInputCollection.length-1].onchange= ()=>{
  let children = theme.children;
  for(let i= 0; i<children.length;i++){
    children[i].style.display = "none";
  }
  changeImg();
  removeDisc()
  audio1.addEventListener('ended',changeImg);
}


// 2nd theme
themeInputCollection[themeInputCollection.length-2].onchange= ()=>{
  let children = theme.children;
  for(let i= 0; i<children.length;i++){
    children[i].style.display = "none";
  }
  changeImg();
  disc()
  audio1.addEventListener('ended',changeImg);
}
let img = document.getElementsByTagName("img");
function disc(){
  document.getElementById("wrapper").style.background = "linear-gradient(lightblue,white)";
  for(let i=0;i<img.length;i++){
    img[i].style.filter = "none";
  }
  document.getElementById("list").style.filter = "invert()";
  theme.style.width='500px'
  theme.style.height='70vh'
  theme.style.borderRadius='50%'
  theme.style.left='36%'
  theme.style.border='2px solid #017b6f'
  theme.style.animation='rotate 5s linear infinite'
  theme.style.backgroundSize='cover'
  animateDisc()
}
function removeDisc(){
  document.getElementById("wrapper").style.background = "";
  for(let i=0;i<img.length;i++){
    img[i].style.filter = "";
  }
  document.getElementById("list").style.filter = "";
  theme.style.width='50%'
  theme.style.height='70vh'
  theme.style.borderRadius='0'
  theme.style.left='25%'
  theme.style.border='0'
  theme.style.animation=''
  theme.style.backgroundSize='contain'
  probar.style.margin='1% 0'
}
function spinDisc(){
  theme.style.animationPlayState='running'
}
function stopDisc(){
  theme.style.animationPlayState='paused'
}
function animateDisc(){
  if(playbtn.checked){
    spinDisc()
  }
  else{
    stopDisc()
  }
}
playbtn.addEventListener('change',()=>{
  animateDisc()
})