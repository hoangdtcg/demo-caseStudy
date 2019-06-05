let Background = function (img) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = img;
    this.bgImg = new Image();
    this.bgImg.src = "images/"+img;

    this.draw = function () {
        let row = Math.ceil(canvas.height/img.height)
        let col = Math.ceil(canvas.width/img.width)
        for (let i = -row;i<row;i++){
            for (let j = 0; j < col; j++){
                ctx.drawImage(this.bgImg, img.width*j, img.height*i + this.y);
            }
        }
    }
}