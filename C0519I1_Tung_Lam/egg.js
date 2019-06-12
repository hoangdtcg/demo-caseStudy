let Egg = function (gameboard, x, y, score, speed, size) {
    this.gameBoard = gameboard;
    this.x = x;
    this.y = y;
    this.score = score;
    this.speed = speed;
    this.size = size;
    this.isAlive = true;
    this.status = true;
    this.color = "blue";


    this.draw = function () {
        gameboard.ctx.beginPath();
        gameboard.ctx.arc(this.x, this.y, this.size, 0,2*Math.PI);
        gameboard.ctx.fillStyle = this.color;
        gameboard.ctx.fill();


    }
    this.move = function () {
        this.y += this.speed;
    }
}