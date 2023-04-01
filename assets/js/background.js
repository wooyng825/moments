const body = document.querySelector('body');
const bgImage = document.createElement('img');
const maxIndex = 40;
let refresh1 = document.querySelector('div#refresh-btn');

function randomImage() {
    let currentIndex = Math.ceil(Math.random() * maxIndex);
    bgImage.src = `./assets/images/bg/${currentIndex}.png`;
    body.appendChild(bgImage);
}

randomImage();
refresh1.addEventListener('click', randomImage);