let Player = function (game, x, y, name, speed, hp) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.size = 35;
    this.name = name;
    this.speed = speed;
    this.hp = hp;
    this.isLive = true;
    this.reload = 3;
    this.reloadCount = 0;
    this.bullets = [];
    this.about = function () {
        return this.name + " has " + this.hp + "HP and move speed is " + this.speed;
    }

    this.draw = function () {
        if (this.isLive) {
            this.game.ctx.rect(this.x, this.y, this.size, this.size);
            this.game.ctx.stroke();
        } else {
            this.game.gameOver();
        }
    }

    this.shoot = function () {
        if (!this.isLive) return;
        this.reloadCount++;
        if (this.reloadCount >= this.reload) { //2 lan ban cach nhau thoi gian reload
            let bullet = new Bullet(this.game, this.x + this.size/2, this.y + this.size/2, 5, 100, 15);//khoi tao bullet o vi tri player
            this.bullets.push(bullet);
            this.reloadCount = 0;
        }

        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].y <= -this.bullets[i].height) {//check bullet bay ra khoi man hinh thi xoa di
                this.bullets.splice(i, 1);
                i--;
            } else {
                this.bullets[i].move();
                this.bullets[i].draw();

            }
        }
    }

    this.takeHit = function (damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.isLive = false;
            this.hp = 0;
        }
    }
}

