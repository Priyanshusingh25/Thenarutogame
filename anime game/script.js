const naruto = document.getElementById("naruto");
const maindiv = document.getElementById("maindiv");
maindiv.style.width = window.innerWidth;
maindiv.style.height = window.innerHeight;

const ninjas = [
    "images/hinata.gif",
    "images/neji.gif",
    "images/sasuke.gif",
    "images/rocklee.gif",
    "images/jiraya.gif",
    "images/sakura.gif",
    "images/itachi.gif",
];
let moveSpeed = 10;

function up() {
    let topPosition = window.getComputedStyle(naruto).getPropertyValue("top");
    if (naruto.style.top === "-80px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= moveSpeed;
        naruto.style.top = `${position}px`;
    }
}

function down() {
    let topPosition = window.getComputedStyle(naruto).getPropertyValue("top");
    let bottom = window.innerHeight - 180;
    if (parseInt(topPosition) > bottom) {
        console.log("active");
        return;
    } else {
        let position = parseInt(topPosition);
        position += moveSpeed;
        naruto.style.top = `${position}px`;
    }
}

function move(event) {
    if (event.key === "ArrowUp") {
        up();
    } else if (event.key === "ArrowDown") {
        down();
    } else {
        throwShuriken();
    }
}

function throwShuriken() {
    let shuriken = createShuriken();
    maindiv.appendChild(shuriken);
    let shurikenSound = new Audio("assests\Sharingan Sound Effect.mp3");
    shurikenSound.play();
    moveShuriken(shuriken);
}

let throww = "images/kunai.gif";
let compensate = 0;

function createShuriken() {
    let x = parseInt(window.getComputedStyle(naruto).getPropertyValue("left"));
    let y = parseInt(window.getComputedStyle(naruto).getPropertyValue("top"));
    let shuriken = document.createElement("img");
    shuriken.src = throww;
    shuriken.classList.add("shuriken");
    shuriken.style.left = `${x + 50}px`;
    shuriken.style.top = `${y + 80 - compensate}px`;
    return shuriken;
}

let shurikenSpeed = 10;

function moveShuriken(shuriken) {
    let interval = setInterval(() => {
        let x = parseInt(shuriken.style.left);

        let ninjass = document.querySelectorAll(".ninja");
        ninjass.forEach((ninja) => {
            if (checkHit(shuriken, ninja)) {
                let chop = new Audio("assests\bone-crack-121580.mp3");
                chop.play();
                ninja.remove();
                shuriken.remove();
                clearInterval(interval);
                let score = document.getElementById("score").innerText;
                document.getElementById("score").innerText =
                    parseInt(document.getElementById("score").innerText) + 1;
                if (parseInt(score) + 1 == 10) {
                    naruto.src = "images/naruto-kyubi.gif";
                    setTimeout(() => {
                        naruto.src = "images/kyuubi.gif";
                    }, 2500);
                    naruto.style.height = "100px";
                    music.pause();
                    fastMusic();
                    compensate = 40;
                    throww = "images/79eG.gif";
                    shurikenSpeed = 3;
                    ninjaSpeed = 10;
                    moveSpeed = 20;
                }
            }
        });

        if (x >= window.innerWidth - 90) {
            shuriken.remove();
        } else {
            shuriken.style.left = `${x + 4}px`;
        }
    }, shurikenSpeed);
}

let musicInterval;

function fastMusic() {
    music = new Audio("assets/fast.mp3");
    music.play();
    musicInterval = setInterval(() => {
        music.play();
    }, 30000);
}

function createNinja() {
    let ninja = document.createElement("img");
    let random = Math.floor(Math.random() * ninjas.length);
    let ninjaImage = ninjas[random];
    ninja.src = ninjaImage;
    ninja.classList.add("ninja");
    if (random == 3) {
        ninja.classList.add('sasuke');
    }
    ninja.style.left = `${window.innerWidth - 80}px`;
    ninja.style.top = `${Math.floor(
    Math.random() * (window.innerHeight - 200)
  )}px`;
    maindiv.appendChild(ninja);
    moveNinja(ninja);
}

let ninjaSpeed = 20;

function moveNinja(ninja) {
    let interval = setInterval(() => {
        let x = parseInt(window.getComputedStyle(ninja).getPropertyValue("left"));
        if (x <= 50) {
            let enemy = parseInt(document.getElementById("enemies").innerText);
            document.getElementById("enemies").innerText = enemy + 1;
            if (enemy == 4) {
                clearInterval(interval);
                ninja.remove();
                end();
            }
            if (checkCol(ninja)) {
                clearInterval(interval);
                ninja.remove();
                end();
            } else {
                ninja.remove();
            }
        } else {
            ninja.style.left = `${x - 4}px`;
        }
    }, ninjaSpeed);
}

function checkCol(ninja) {
    let y = parseInt(window.getComputedStyle(ninja).getPropertyValue("top")) - 64;
    let yNaruto = parseInt(
        window.getComputedStyle(naruto).getPropertyValue("top")
    );
    console.log(`yNar: ${yNaruto} : ${y}`);
    if (yNaruto >= y && yNaruto <= y + 100) {
        return true;
    } else if (yNaruto + 65 > y && yNaruto + 65 <= y + 100) {
        return true;
    } else {
        return false;
    }
}

function checkHit(shuriken, ninja) {
    let ninjaLeft = parseInt(ninja.style.left);
    let ninjaTop = parseInt(ninja.style.top);
    let ninjaBottom = ninjaTop + 100;

    let shurikenLeft = parseInt(shuriken.style.left);
    let shurikenTop = parseInt(shuriken.style.top);
    let shurikenBottom = shurikenTop + 60;

    if (shurikenLeft + 35 >= ninjaLeft) {
        if (ninja.classList.contains('sasuke')) {
            console.log('sasuke');
        } else {
            console.log('else');
        }
        if (shurikenTop >= ninjaTop && shurikenTop <= ninjaBottom) {
            return true;
        } else if (shurikenBottom <= ninjaBottom && shurikenBottom >= ninjaTop) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

let music = new Audio("assests\bone-crack-121580.mp3");
let ninjaComing;

function start() {
    document.getElementById("start").style.display = "none";
    document.getElementById("guide").style.display = "none";
    document.getElementById("clone").style.display = "none";
    ninjaComing = setInterval(() => {
        createNinja();
    }, 3000);
    music.play();
    window.addEventListener("keydown", move);
}

function end() {
    window.removeEventListener("keydown", move);
    music.pause();
    clearInterval(ninjaComing);
    clearInterval(musicInterval);
    const sad = new Audio("assests\mixkit-cartoon-sad-party-horn-527.wav");
    sad.play();
    let ninjass = document.querySelectorAll(".ninja");
    ninjass.forEach((ninja) => {
        ninja.remove();
    });
    naruto.src = 'images/kunai.gif';
    document.getElementById("guide").style.display = "block";
    document.getElementById("restart").style.display = "block";
    document.getElementById(
        "guide"
    ).innerHTML = `<strong>Sorry...! You lost</strong> <br> You final score was <h3>${
    document.getElementById("score").innerText
  }</h3>`;
}

function restart() {
    location.reload();
}
music.onended = () => {
    music.play();
};