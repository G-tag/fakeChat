// var isNode = true;
// try {
//     window;
//     isNode = false
// } catch (error) {
//     isNode = true;
// }

// var Canvas, Image, fs;

// if (isNode) {
// var Canvas = require('canvas'),

var fs = require('fs');
const { createCanvas, registerFont, loadImage, Image } = require('canvas')
// registerFont('./font/PingFang.ttc', {family: 'PingFang'});

//     Image = Canvas.Image,

// } else {
//     Image = Image
// }

const readFile = async function (path) {
    if (isNode) {
        return fs.readFileSync(__dirname + path)
    } else {
        return new Promise(function (resolve, reject) {
            var img = new Image()
            img.src = path;
            img.onload = function () //确保图片已经加载完毕
            {
                resolve(img)
            }
        })
        // var loaded = true;
        // var img = new Image()
        // img.src = path;
        // img.onload = function () //确保图片已经加载完毕
        // {
        //     loaded = false
        // }
        // while (loaded) {

        // }   
        // return img     
    }
}



class fakeChat {
    constructor(width = 750, height = 1334, context) {
        this.width = width
        this.height = height
        // if (isNode) {
        this.canvas = createCanvas(width, height)

        // } else {
        //     this.canvas = context
        // }
        this.ctx = this.canvas.getContext('2d')
    }

    drawImage(src, x, y, width, height) {
        var imgSrouce = fs.readFileSync(__dirname + src)
        var img;
        // if (isNode) {
        img = new Image;
        img.src = imgSrouce;
        // } else {
        //     img = imgSrouce
        // }
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

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    outBase64() {
        return this.canvas.toDataURL()
    }

    outImage() {
        return this.canvas.pngStream();
    }
}
// if (!isNode) {
//     window.fakeChat = fakeChat
// }

// if (isNode) {
module.exports = fakeChat
// }

