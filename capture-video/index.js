const video = document.querySelector('video');
const screenshotButton = document.querySelector('#screenshot-button');
const img = document.querySelector('#screenshot-img');
const canvas = document.createElement('canvas');

navigator.mediaDevices.getUserMedia({ video: true }).
then((stream) => { video.srcObject = stream });

screenshotButton.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    img.src = canvas.toDataURL('image/webp');
    console.log(canvas.toDataURL('image/webp'))
};