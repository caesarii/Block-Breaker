class SceneEnd extends GameScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            const s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        game.drawText('游戏结束, 按 r 返回标题界面', 100, 290)
    }
}
