class Paddle extends GameImage {
    constructor(game) {
        super(game)
        const img = game.imageByName('paddle')
        this.image = img
        this.w = img.width
        this.h = img.height
        this.x = 100
        this.y = 250
        this.speed = 15
        
    }
    move(x) {
        const o = this
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
        }
        o.x = x
    }
    
    moveLeft() {
        this.move(this.x - this.speed)
    }
    
    moveRight() {
        this.move(this.x + this.speed)
    }
    
    collide(ball) {
        
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.w) {
        //         log('相撞')
        //         return true
        //     }
        // }
        // return false
        const a = this
        const b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    
}

