const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const points = document.querySelector(".points");
const audioMario = document.querySelector(".audioMario");
const audioSong = document.querySelector(".audioSong");
const audioDied = document.querySelector(".audioDied");
const audioJump = document.querySelector(".audioJump");
audioJump.volume = 0.3;
audioSong.volume = 0.7;
const restart = document.querySelector(".restartButtonDiv");
let numberOfPoints = 0;
let pointAdded = false;

const jump = () => {
    audioJump.play();
    mario.classList.add("jump");

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

const loop = setInterval(() => {
    const pipePositionLeft = pipe.offsetLeft;
    const cloudsPositionLeft = clouds.offsetLeft;
    const marioPositionBottom = +window.getComputedStyle(mario).bottom.replace('px', '');
    // + tries to convert string to number
    points.textContent = `Pontos: ${numberOfPoints}`;

    console.log("pipePositionLeft: ", pipePositionLeft);
    console.log("cloudsPositionLeft: ", cloudsPositionLeft);
    console.log("marioPositionBottom: ", marioPositionBottom);


    // game over condition
    if(pipePositionLeft <= 120 && pipePositionLeft > 0 && marioPositionBottom < 80){
        pipe.style.animation = "none";
        pipe.style.left = `${pipePositionLeft}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPositionBottom}px`;
        mario.src = "./images/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";

        clouds.style.animation = "none";
        clouds.style.left = `${cloudsPositionLeft}px`;

        audioSong.pause();

        audioDied.play();

        restart.style.display = "flex";
        restart.addEventListener("click", () => {
            window.location.reload();
        })

        document.removeEventListener("keydown", jump);

        clearInterval(loop);
    }
    // adding point condition
    else if(pipePositionLeft < mario.style.left){
        if(pointAdded === false){
            numberOfPoints += 1;
            pointAdded = true;
        }
    }
    else{
        pointAdded = false;
    }

}, 10);

audioMario.play();
audioSong.play();
document.addEventListener("keydown", jump);