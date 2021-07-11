// Canvas Variables 
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1;
var dy = -1;

// ball variable
var ballRadius = 10;


// Paddle varibales
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

// Paddle button control Variabels
var leftPressed = false; 
var rightPressed = false;


// Brick Variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 40;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


// bricks in a 2 demensional array
var bricks = [];

var score = 0;



function drawBall(){
    // draw a ball 
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


// checking collision

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            // calculations
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("Congratulations! YOU WIN!!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }

        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText('Score: '+score, 8, 20);
}


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}


function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

for(var c = 0; c < brickColumnCount; c++){
    bricks[c] = [];

    for (var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}


function drawBricks(){
    for(var c= 0; c < brickColumnCount; c++){
        for(var r= 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;

            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}


function draw() {
    // drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    drawBricks();


    // Bouncing off the walls code
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    }
    if(y + dy < ballRadius) {
    dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
           if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightPressed) {
    paddleX += 5;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
    }
    else if(leftPressed) {
        paddleX -= 5;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
        
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10)