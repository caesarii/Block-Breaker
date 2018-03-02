class Block extends GameImage {
    constructor(game, position) {
        super(game, position)
        const p = position
        const img = game.imageByName('block')
        this.x = p[0]
        this.y = p[1]
        this.alive = true
        this.lifes = p[2] || 1
        this.image = img
        this.w = img.width
        this.h = img.height
    }
    kill() {
        const o = this
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    collide(b) {
        const o = this
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
}

//
// const Block = function(game, position) {
//     // positon 是 [0, 0] 格式
//     const p = position
//     const img = game.imageByName('block')
//     const o = {
//         x: p[0],
//         y: p[1],
//         alive: true,
//         lifes: p[2] || 1,
//     }
//     o.image = img.image
//     o.w = img.w
//     o.h = img.h
//     o.kill = function() {
//         o.lifes--
//         if (o.lifes < 1) {
//             o.alive = false
//         }
//     }
//     o.collide = function(b) {
//         // log('block', o.alive, b)
//         return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
//     }
//     return o
// }
