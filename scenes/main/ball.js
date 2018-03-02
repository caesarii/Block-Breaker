class Ball extends GameImage {
    constructor(game) {
        super(game)
        const img = game.imageByName('ball')
        // GameImage 共有的属性
        this.image = img
        this.w = img.width
        this.h = img.height
        this.x = 100
        this.y = 200
        this.speedX = 5
        this.speedY = 5
        
        // Ball 特有的属性
        this.fired = false
    }
    fire() {
        this.fired = true
    }
    move() {
        const o = this
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    bounce() {
        this.speedY *= -1
    }
    hasPoint(x, y) {
        const o = this
        const xIn = x >= o.x && x <= o.x + o.w
        const yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}
//
// const Ball = function(game) {
//     const o = game.imageByName('ball')
//     // const image = imageFromPath('ball.png')
//     o.x = 100
//     o.y = 200
//     o.speedX = 5
//     o.speedY = 5
//     o.fired = false
//
//     o.fire = function() {
//         o.fired = true
//     }
//     o.move = function() {
//         if (o.fired) {
//             // log('move')
//             if (o.x < 0 || o.x > 400) {
//                 o.speedX = -o.speedX
//             }
//             if (o.y < 0 || o.y > 300) {
//                 o.speedY = -o.speedY
//             }
//             // move
//             o.x += o.speedX
//             o.y += o.speedY
//         }
//     }
//     o.反弹 = function() {
//         o.speedY *= -1
//     }
//     o.hasPoint = function(x, y) {
//         const xIn = x >= o.x && x <= o.x + o.w
//         const yIn = y >= o.y && y <= o.y + o.h
//         return xIn && yIn
//     }
//     return o
// }
