class SceneTitle extends Scene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            const s = SceneMain(game)
            log('scene main', s)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            const s = new SceneLevel(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        // log('draw title')
        this.game.drawText('按 k 开始游戏', 100, 190)
        this.game.drawText('按 e 进入关卡编辑器', 100, 210)
    }
}
