let GameBoard = function () {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.txtScore = document.querySelector("#current-score>span");
    this.txtHp = document.querySelector("#hp>span");
    this.uiMenu = document.getElementById("menu");
    this.txtEndScore = document.getElementById("end-score");
    this.btnRestart = document.getElementById("restart");
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.enemies = [];
    //khoi tao game
    this.init = function (name) {
        let x = this.canvas.width / 2;
        let y = this.canvas.height - 100;
        let speed = 20;
        let hp = 100;
        this.player = new Player(this, x, y, name, speed,hp);
        this.txtHp.innerHTML = this.player.hp;
    }

}
//tao enemy va dua vao mang
GameBoard.prototype.createEnemy = function () {
    let num = random(1, 1000);
    if (num < 40) {
        let enemy = new Enemy(this, random(0, this.canvas.width), -20);
        this.enemies.push(enemy);
    }
}
//hien thi enemy co tren man hinh
GameBoard.prototype.showEnemy = function () {
    for (let i = 0; i < this.enemies.length; i++) {

        if (this.enemies[i].y >= this.enemies[i].height) {
            this.enemies.splice(i, 1);
            i--;
        } else {
            this.enemies[i].move();
            this.enemies[i].draw();

        }
    }
}

//check va cham giua 2 doi tuong
GameBoard.prototype.crash = function (obj1, obj2) {
    let left1 = obj1.x;
    let right1 = obj1.x + obj1.size;
    let top1 = obj1.y;
    let bottom1 = obj1.y + obj1.size;
    let left2 = obj2.x;
    let right2 = obj2.x + obj2.size;
    let top2 = obj2.y;
    let bottom2 = obj2.y + obj2.size;
    if (right1 < left2 || bottom1 < top2 || left1 > right2 || top1 > bottom2) {
        return false;
    } else {
        return true;
    }
}

GameBoard.prototype.justify = function () {
    //check enemy va cham voi bullet
    for (let enemy = 0; enemy < this.enemies.length; enemy++) {
        for (let bullet = 0; bullet < this.player.bullets.length; bullet++) {
            if (!this.enemies[enemy].isLive) break;
            if (!this.crash(this.enemies[enemy], this.player.bullets[bullet])) {
                continue;
            }
            this.enemies[enemy].takeHit(this.player.bullets[bullet].damage);
            if (this.enemies[enemy].hp <= 0) {
                this.enemies[enemy].isLive = false;
                this.takeScore(this.enemies[enemy].score);
            }
            this.player.bullets.slice(bullet, 1);
        }
    }
    //check enemy va cham voi player
    for (let i = 0; i < this.enemies.length; i++) {
        if (!this.enemies[i].isLive) continue;
        if (this.crash(this.enemies[i], this.player)){
            this.player.takeHit(this.enemies[i].damage);//player nhan damage khi va cham voi enemy
            this.enemies.splice(i, 1);
            i--;
            this.txtHp.innerHTML = this.player.hp;
        }


    }
}

GameBoard.prototype.takeScore = function (score) {
    this.txtScore.innerHTML = parseInt(this.txtScore.innerText) + score;
}

GameBoard.prototype.gameOver = function () {
    this.uiMenu.style.display = "block";
    this.txtEndScore.innerHTML = this.txtScore.innerText;
}
//choi lai
replay = function () {
    location.href = location.href + "?id=" + 1000 * Math.random();
}

//control
function control(canvas) {
    canvas.onmousedown = function (event) {
        let x = event.offsetX;
        let y = event.offsetY;
        if (x >= game.player.x && x <= game.player.x + game.player.size) {
            canvas.onmousemove = function (event) {
                game.player.x = event.offsetX - game.player.size / 2;
                // game.player.y = event.offsetY - game.player.h / 2;
            }
        }
    }

    canvas.onmouseup = function () {
        canvas.onmousemove = null;
    }

    canvas.ontouchstart = function (event) {
        let x = event.touches[0].clientX;
        let y = event.touches[0].clientY;
        if (x >= game.player.x && x <= game.player.x + game.player.size) {
            canvas.ontouchmove = function (event) {
                game.player.x = event.touches[0].clientX - game.player.size / 2;
                // game.player.y = event.touches[0].clientY - game.player.h / 2;
                event.preventDefault();
            }
        }
    }
}

//global function
function getRandomHex() {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    let red = getRandomHex();
    let green = getRandomHex();
    let blue = getRandomHex();
    return "rgb(" + red + "," + blue + "," + green + ")";
}

function random(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
}

//Main function
function main() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.player.draw();
    game.player.shoot();
    game.createEnemy();
    game.showEnemy();
    if (game.player.isLive)
        game.justify();
    else
        game.gameOver();
    control(game.canvas);
    requestAnimationFrame(main);
}