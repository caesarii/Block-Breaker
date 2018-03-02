
class SceneLevel  extends GameScene {
    constructor(game) {
        super(game)
        this.init(game)
    }
    
    init(game) {
        this.game = game
        this.paddle = Paddle.new(game)
        this.ball = Ball.new(game)
        this.score = 0
        this.blocks = [] // loadLevel(game, 1)
        this.enableDrag = false
        
        this.registerKeys(game)
        
        const canvas = game.canvas
        canvas.addEventListener('click', (e) => {
            const {clientX:cx, clientY:cy} = e
            console.log('e', cx, cy)
            const b = Block.new(game, [cx, cy])
            this.blocks.push(b)
        })
        
    }
    
    registerKeys(game) {
        const paddle = this.paddle
        const ball = this.ball
        game.registerAction('a', function(){
            paddle.moveLeft()
        })
        game.registerAction('d', function(){
            paddle.moveRight()
        })
        game.registerAction('f', function(){
            ball.fire()
        })
        game.registerAction('e', function(){
            const s = SceneLevel.new(game)
            game.replaceScene(s)
        })
        
        game.registerAction('s', function(){
            const s = SceneMain.new(game)
            game.replaceScene(s)
        })
    }
    
    
    draw() {
        const {game, blocks, paddle, ball, score} = this
        // draw 背景
        game.drawRect([0, 0, 400, 300])
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.drawText('分数: ' + score, 100, 200)
    }
    update() {
        const {game, blocks, paddle, ball} = this
        let score = this.score
        
        if (window.paused) {
            return
        }
        
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到 游戏结束 的场景
            const end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.bounce()
        }
        // 判断 ball 和 blocks 相撞
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.bounce()
                // 更新分数
                score += 100
            }
        }
    }
    
    drag(game) {
        let enableDrag = this.enableDrag
        const ball = this.ball
        // mouse event
    
        game.canvas.addEventListener('mousedown', function(event) {
            const x = event.offsetX
            const y = event.offsetY
            log(x, y, event)
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            const x = event.offsetX
            const y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                log(x, y, 'drag')
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            const x = event.offsetX
            const y = event.offsetY
            log(x, y, 'up')
            enableDrag = false
        })
    }
}

