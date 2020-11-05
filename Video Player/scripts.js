
// Get the elements
const player = document.querySelector(`.player`);
const video = player.querySelector(`.viewer`);
const progress = player.querySelector(`.progress`);
const progressFilled = player.querySelector(`.progress__filled`);
const toggle = player.querySelector('.toggle');
const fullScreen = player.querySelector('.fullscreen');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// Build the functions
function Handletoggle(){
    if (video.paused){
        video.play();
    }else {
        video.pause();
    }
}
function changeIcon(){
    const icon = this.paused;
    if (icon){
        toggle.textContent = '►';
    }else {
        toggle.textContent = '❚❚';
    }
}
function skip (){
console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange(){
    video[this.name] = [this.value];
    
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const selectedTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = selectedTime;
    console.log(e);
}

function toggleFullscreen (e){
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

// Hook up the event listener
toggle.addEventListener('click', Handletoggle);


video.addEventListener('click', Handletoggle);
video.addEventListener('play', changeIcon);
fullScreen.addEventListener('click', toggleFullscreen);
video.addEventListener('pause', changeIcon);
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
// Scrub while dragging on a mouse move
progress.addEventListener('mousemove', (e)=>{
    if (mousedown){
        scrub(e);
    }
});
progress.addEventListener('mouseup', ()=> mousedown = false);
progress.addEventListener('mousedown', ()=> mousedown = true);


skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));