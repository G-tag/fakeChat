var Canvas = require('canvas'),
    Image = Canvas.Image
var fs = require('fs');

class fakeChat {
    constructor(width = 750, height = 1334) {
        this.width = width
        this.height = height
        this.canvas = new Canvas(width, height)
        this.ctx = this.canvas.getContext('2d')
    }

    drawImage(src, x, y, width, height) {
        var imgSrouce = fs.readFileSync(__dirname + src)
        var img = new Image;
        img.src = imgSrouce;
        this.ctx.drawImage(img, x, y, width, height);
        return this
    }

    drawText(text, style, color = "#fff", position) {
        this.ctx.font = style
        this.ctx.fillStyle = color
        // 让字体圆心在左上角
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
    
        this.ctx.fillText(text, position.x, position.y);
        return this
    }

    getWidth(){
        return this.width
    }

    getHeight(){
        return this.height
    }

    outBase64(){
        return this.canvas.toDataURL()
    }

    outImage() {
        return this.canvas.pngStream();
    }
}

module.exports = fakeChat
