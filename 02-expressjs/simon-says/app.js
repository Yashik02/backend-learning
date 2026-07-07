let gameSeq = [];
let userSeq = [];
let buttons = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let isProcessing = false;
let highScore = 0;

//starting the game
document.addEventListener("keypress", function () {
    if(started == false) {
        started = true;
        levelup();
    }
});


function levelup() {
    isProcessing = true;
    userSeq = [];
    level++;
    highScore = Math.max(level, highScore)
    document.querySelector("h3").innerText = `Level ${level}`;

    let rndbtn = buttons[random(0, 3)];
    gameSeq.push(rndbtn);
    flash(document.querySelector(`.${rndbtn}`));

    setTimeout(() => {
        isProcessing = false;
    }, 400);
}


function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function flashRed() {
    let body = document.querySelector("body");
    body.classList.add("flashRed");
    setTimeout(() => {
        body.classList.remove("flashRed");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 300);
}

function checkAns(idx) {
    if(gameSeq[idx] == userSeq[idx]) {
        if(gameSeq.length-1 == idx) {
            isProcessing = true;
            setTimeout(() => {
                levelup();
            }, 1000);
        }
    } else {
        isProcessing = true;
        document.querySelector("h3").innerText = `Game over! Score: ${level-1}. High Score: ${highScore-1}. Press any key.`;
        flashRed();
        reset();
    }
}

function btnPress () {
    if (!started || isProcessing) {
        return; 
    }
    userSeq.push(this.id) 
    userFlash(this);

    checkAns(userSeq.length-1);
}

for(let btn of document.querySelectorAll(".button")) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    isProcessing = false;
}

function random(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

let hint = document.querySelector("#hint");
hint.addEventListener("click", function () {
    if (started && !isProcessing && userSeq.length === 0) {
        showHint();
    }
});

function showHint() {
    isProcessing = true;
    let i = 0;
    
    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.querySelector(`#${color}`);
        flash(btn);
        
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
            setTimeout(() => {
                isProcessing = false;
            }, 400);
        }
    }, 600);
}