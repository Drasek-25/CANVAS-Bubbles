const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const frameRate = 10;
const exitRange = 30
let currentBallCount = 0;
let maxBallCount = 0;

const randomNum = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low)
}

const savedCircles = [];
const circleInfo = function (e) {
    if (e === undefined) { e = false }
    this.velX = randomNum(-2, 2);
    this.velY = randomNum(-1, -3);
    this.currentX = e.pageX || randomNum(0, ctx.canvas.width);
    this.currentY = e.pageY || ctx.canvas.height + exitRange;
    this.radius = randomNum(5, 20);
}

function drawBall(x, y, ballRad, ) {
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI * 2);
    ctx.fillStyle = '#d4d4d4';
    ctx.fill();
    ctx.closePath();
}

canvas.addEventListener('mousedown', function (e) {
    for (count = 5; count > 0; count--) {
        let circle = new circleInfo(e)
        savedCircles.push(circle)
        currentBallCount++
    }
});

function draw() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    maxBallCount = (ctx.canvas.width + ctx.canvas.height) / 20;
    for (i = 0; i < savedCircles.length; i++) {
        drawBall(savedCircles[i].currentX, savedCircles[i].currentY, savedCircles[i].radius)
        savedCircles[i].currentX += savedCircles[i].velX
        savedCircles[i].currentY += savedCircles[i].velY
        if (savedCircles[i].currentX > ctx.canvas.width + exitRange || savedCircles[i].currentX < -exitRange || savedCircles[i].currentY < -exitRange) {
            savedCircles.splice(i, 1)
            currentBallCount--
        }
    }

    if (currentBallCount < maxBallCount) {
        let circle = new circleInfo()
        savedCircles.push(circle)
        currentBallCount++
    }
}
setInterval(draw, frameRate);