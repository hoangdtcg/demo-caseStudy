let Player = function (gameboard, x, y, hp, speed, size) {
    this.gameBoard = gameboard;
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.speed = speed;
    this.size = size;
    this.color = "red";
    this.isAlive = true;
    let self = this;


    this.draw = function () {
        // vẽ player
        gameboard.ctx.beginPath();
        gameboard.ctx.fillRect(this.x, this.y, this.size, this.size);
        gameboard.ctx.fillStyle = "this.color";
        gameboard.ctx.fill();
    };
    this.clear = function () {
        gameboard.ctx.clearRect(this.x,this.y,this.size,this.color);
    }
    this.moveleft = function () {
        this.x -= this.speed;
    };
    this.moveright = function () {
        this.x += this.speed;
    }
}