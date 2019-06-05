let Bullet = function (game,x,y,size,damage,speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = size;
    this.height = -30;
    this.color = getRandomColor();
    this.damage = damage;
    this.speed = speed;

}

Bullet.prototype.draw = function () {
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    game.ctx.fillStyle = this.color;
    game.ctx.fill();
}

Bullet.prototype.move = function () {
    this.y -= this.speed;
}