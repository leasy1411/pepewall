var audioSamples = [];
var audioSamples2 = [];
var peakValue = 1;
var i = 0;
var median = 0;
function wallpaperAudioListener(audioArray) {
  audioSamples = audioArray;
  var max = 0;
  // find max value for current frame
  for (i = 0; i < audioSamples.length; i++ )
  {
    if( audioSamples[ i ] > max ) max = audioSamples[i];
  }
  // adjust ratio to how fast or slow you want normalization to react volume changes
  peakValue = peakValue * 0.99 + max * 0.01;
  var audioSamples2 = audioSamples;
  // normalize value
  for (i = 0; i < audioSamples.length; i++ )
  {
    audioSamples[i] /= peakValue;
  }


  //median
  var half = Math.floor(audioSamples2.length / 2);
  audioSamples2 = audioSamples;

  audioSamples2.sort(function(a, b) { return a - b;});

  if (audioSamples2.length % 2) {
    median = audioSamples2[half];
  } else {
    median = (audioSamples2[half-1] + audioSamples2[half]) / 2.0;
  }

};



function run() {
  window.requestAnimationFrame(run);
  for (i = 0; i < audioSamples.length; i++) {
    if (audioSamples[i] > 1) {
      document.getElementById("myDIV").style.animationPlayState = "running";
    } else {
      document.getElementById("myDIV").style.animationPlayState = "paused";
    }
  }
}

window.onload = function() {
  window.wallpaperRegisterAudioListener(wallpaperAudioListener);

  window.requestAnimationFrame(run);
};