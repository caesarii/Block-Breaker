const loadLevel = function(game, n) {
    n = n - 1
    const level = levels[n]
    const blocks = []
    for (let i = 0; i < level.length; i++) {
        const p = level[i]
        const b = Block.new(game, p)
        blocks.push(b)
    }
    return blocks
}

const enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        const k = event.key
        if (k === 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        const input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

const __main = function() {
    const images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    const game = Game.new(30, images, function(g){
        log('callback')
        const s = SceneTitle.new(g)
        g.loadScene(s)
    })
    
    enableDebugMode(game, true)
}

__main()
