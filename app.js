var fakeChat = require('./index');
var fs = require('fs');
var out = fs.createWriteStream(__dirname + '/output.png');

class FakeIos {
    constructor() {
        this.CoreDraw = new fakeChat(750, 1334)
        // 绘制模板背景
        this.CoreDraw.drawImage('/temp.png', 0, 0, 750, 1334);
        this.defaultTop = 180;
    }

    // 绘制时间
    drawTime(time) {
        this.CoreDraw.ctx.font = 'Bold 30px "PingFang SC"'
        var width = this.CoreDraw.ctx.measureText(time).width
        this.CoreDraw.drawText(time, 'Bold 24px "PingFang SC"', '#fff', { x: (this.CoreDraw.getWidth() - width) / 2, y: 4 })
        this.CoreDraw.drawText(time, 'Bold 24px "PingFang SC"', '#fff', { x: (this.CoreDraw.getWidth() - width) / 2-0.6, y: 4-0.6 })
    }

    // 绘制wifi & 4G
    drawWifi(type) {
        if (type) {
            this.CoreDraw.drawImage('/i-top-wifi.png', 161, 0, 30, 40); // wifi
        } else {
            this.CoreDraw.drawText('4G', 'Medium 24px "PingFang SC"', '#fff', { x: 161, y: 4 }) // 4G
        }
    }

    // 计算字符长度
    strLengthWithDom(str) {
        this.CoreDraw.ctx.font = '30px "PingFang SC"'
        return this.CoreDraw.ctx.measureText(str).width
    }

    // 计算字符高度
    strHeightWithDom(str) {
        this.CoreDraw.ctx.font = '30px "PingFang SC"'
        return this.CoreDraw.ctx.measureText(str).height
    }

    // 绘制头像 77*77 left 19px
    drawAvatar(top, type) {
        if (type) {
            this.CoreDraw.drawImage('/avatar.png', 19, top, 77, 77);
        } else {
            this.CoreDraw.drawImage('/avatar.png', 654, top, 77, 77);
        }
    }

    chatBox_other_1(avatar, text) {
        var left = 106
        var top = this.defaultTop
        this.drawAvatar(top, true)
        var chatWidth = this.strLengthWithDom(text)
        var width = 0;
        var line = 0;
        var lastIdx = 0;
        var strs = []
        for (var i = 0; i < text.length; i++) {
            width += this.strLengthWithDom(text[i])
            if (width > 420) {
                var _text = text.substring(lastIdx, (i + (line === 0 ? 1 : 0)))
                strs.push(_text)
                lastIdx = i;
                width = 0;
                line++;
            }

            if (i === text.length - 1) {
                strs.push(text.substring(lastIdx+1))
                line++;
            }
        }

        if (chatWidth > 420) {
            // 换行
            chatWidth = 440;
        }

        var left = 115;
        var top = top;
        var height = (line === 0 ? 62 : (62 + (line-1) * 40));
        var padding = chatWidth > 420 ? (10 * 2) : 0;
        // 圆角不变形
        this.CoreDraw.drawImage('/assets/chat_box_1/1.png', left, top, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_1/2.png', left + 7, top, chatWidth + padding, 7);
        this.CoreDraw.drawImage('/assets/chat_box_1/3.png', left + 7 + chatWidth + padding - 1, top, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_1/4.png', left, top + 7, 7, height);
        this.CoreDraw.drawImage('/assets/chat_box_1/5.png', left + 7, top + 7, chatWidth + padding, height);
        this.CoreDraw.drawImage('/assets/chat_box_1/6.png', left + 7 + chatWidth + padding - 1, top + 7, 7, height);
        this.CoreDraw.drawImage('/assets/chat_box_1/7.png', left, top + 7 + height, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_1/8.png', left + 7, top + 7 + height, chatWidth + padding, 7);
        this.CoreDraw.drawImage('/assets/chat_box_1/9.png', left + 7 + chatWidth + padding - 1, top + 7 + height, 7, 7);
        this.CoreDraw.drawImage('/text_bg_arrow.png', left - 11, top + 25, 12, 25);

        if (strs.length) {
            strs.map((item, idx) => {
                this.CoreDraw.drawText(item, 'Bold 30px "PingFang SC"', '#000', { x: left + 20, y: top + 20 + 40 * idx })
            })
        } else {
            this.CoreDraw.drawText(text, 'Bold 30px "PingFang SC"', '#000', { x: left + 20, y: top + 20 + 40 * line })
        }
        this.defaultTop += (height + 103 / 2)
    }

    chatBox_other_2(avatar, text) {
        var left = 106
        var top = this.defaultTop
        this.drawAvatar(top, false)
        var chatWidth = this.strLengthWithDom(text)
        var width = 0;
        var line = 0;
        var lastIdx = 0;
        var strs = []
        for (var i = 0; i < text.length; i++) {
            width += this.strLengthWithDom(text[i])
            if (width > 420) {
                var _text = text.substring(lastIdx, (i + (line === 0 ? 1 : 0)))
                strs.push(_text)
                lastIdx = i;
                width = 0;
                line++;
            }

            if (i === text.length - 1) {
                strs.push(text.substring(lastIdx+1))
                line++;
            }
        }

        if (chatWidth > 420) {
            // 换行
            chatWidth = 440;
        }
        var padding = chatWidth > 420 ? (10 * 2) : 0;
        var left = this.CoreDraw.getWidth() - (chatWidth + padding) - 115 - 14;
        var top = top;
        var height = (line === 0 ? 62 : (62 + (line-1) * 40));
        // 圆角不变形
        this.CoreDraw.drawImage('/assets/chat_box_2/1.png', left, top, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/2.png', left + 7, top, chatWidth + padding, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/3.png', left + 7 + chatWidth + padding - 1, top, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/4.png', left, top + 7, 7, height);
        this.CoreDraw.drawImage('/assets/chat_box_2/5.png', left + 7, top + 7, chatWidth + padding, height);
        this.CoreDraw.drawImage('/assets/chat_box_2/6.png', left + 7 + chatWidth + padding - 1, top + 7, 7, height);
        this.CoreDraw.drawImage('/assets/chat_box_2/7.png', left, top + 7 + height, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/8.png', left + 7, top + 7 + height, chatWidth + padding, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/9.png', left + 7 + chatWidth + padding - 1, top + 7 + height, 7, 7);
        this.CoreDraw.drawImage('/assets/chat_box_2/arrow.png', 633, top + 25, 12, 25);
        if (strs.length) {
            strs.map((item, idx) => {
                this.CoreDraw.drawText(item, 'Bold 30px "PingFang SC"', '#000', { x: left + 20, y: top + 20 + 40 * idx })
            })
        } else {
            this.CoreDraw.drawText(text, 'Bold 30px "PingFang SC"', '#000', { x: left + 20, y: top + 20 + 40 * line })
        }
        this.defaultTop += (height + 103 / 2)
    }

    drawNickName(text) {
        this.CoreDraw.ctx.font = 'Bold 30px "PingFang SC"'
        var width = this.CoreDraw.ctx.measureText(text).width
        this.CoreDraw.drawText(text, 'Bold 38px "PingFang SC"', '#fff',
            {
                x: (this.CoreDraw.getWidth() - width) / 2 -5,
                y: 62
            }
        )
        this.CoreDraw.drawText(text, 'Bold 38px "PingFang SC"', '#fff',
            {
                x: (this.CoreDraw.getWidth() - width) / 2-5-0.5,
                y: 62-0.5
            }
        )
    }

    getDistUrl() {
        return this.CoreDraw.outBase64()
    }

    getDistStream() {
        return this.CoreDraw.outImage()
    }
}

var fake1 = new FakeIos()
fake1.drawNickName('无敌美少女▲❤')
fake1.drawWifi(true)
fake1.drawTime('上午1:56')


fake1.chatBox_other_1('', '@桀 鸡哥，beestore安装链接来一个呢，之前安装的用不起了')
fake1.chatBox_other_2('', 'beestore很好用的，不需要海外ID')
fake1.chatBox_other_1('', '吃瓜群众表示 在非官方平台下app很不放心')
fake1.chatBox_other_2('', '老板亲自发广告?')
fake1.chatBox_other_1('', '哈哈哈哈')
fake1.chatBox_other_2('', '哈哈哈哈1')

var stream = fake1.getDistStream()
stream.on('data', function (chunk) {
    out.write(chunk);
});

stream.on('end', function () {
    console.log('saved png');
});



// TODO
`
1.emoji 微信默认表情
2.发红包
3.转账
4.收账
5.语音
6.语音转文字
7.发图片
8.文字中有链接 变色
9.消息数量
10.撤回消息通知
11.N条消息 对齐最下面那条 多的截取掉
12.更换聊天背景
`