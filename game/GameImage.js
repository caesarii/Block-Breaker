
class GameImage extends GameObject {
    constructor(game, name) {
        super()
        this.texture = game.textureByName(name)
        this.w = this.texture.width
        this.h = this.texture.height
        this.x = 0
        this.y = 0
    }
    
    draw() {
        this.game.drawImage(this)
    }
    
    update() {
    
    }
}