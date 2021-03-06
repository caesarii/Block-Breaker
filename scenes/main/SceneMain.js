class SceneMain extends GameScene {
    constructor(game) {
        super(game)
        this.paddle = Paddle.new(game)
        this.ball = Ball.new(game)
        this.score = 0
        this.blocks = loadLevel(game, 1)
        this.init()
    }
    
    init() {
        const {game, paddle, ball, }= this
        game.registerAction('a', function(){
            paddle.moveLeft()
        })
        game.registerAction('d', function(){
            paddle.moveRight()
        })
        game.registerAction('f', function(){
            ball.fire()
        })
        
        // mouse event
        let enableDrag = false
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
    
    draw() {
        // draw 背景
        const {game, paddle, ball, score, blocks}= this
        game.drawRect([0, 0, 400, 300])
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)
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
        game.drawText('分数: ' + score, 10, 290)
        // game.context.fillText('分数: ' + score, 10, 290)
    }
    
    update() {
        if (window.paused) {
            return
        }
        let {game, paddle, ball, score, blocks }= this
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
}

