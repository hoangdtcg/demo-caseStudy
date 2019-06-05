let Enemy = function (game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 25;
    this.score = 5;
    this.speed = 7;
    this.hp = 100;
    this.damage = 50;
    this.isLive = true;
    this.height = this.game.canvas.height + 50;;
    this.color = getRandomColor();
}

Enemy.prototype.draw = function () {
    if(this.isLive) {
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fill();
    }
}

Enemy.prototype.move = function () {
    this.y += this.speed;
}

Enemy.prototype.takeHit = function (damage) {
    this.hp -= damage;
}
