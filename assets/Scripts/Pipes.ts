import { _decorator, Canvas, Component, director, find, Node, screen, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {

    @property({ type: Node })
    public topPipe: Node = null!;

    @property({ type: Node })
    public bottomPipe: Node = null!;

    public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;

    public game;
    public pipeSpeed: number = 200;
    public tempSpeed: number = 0;

    private isPass: boolean = false;

    onLoad () {
        this.game = find('GameCtrl').getComponent('GameCtrl');
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    initPos () {
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width / 2);
        this.tempStartLocationDown.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width / 2);

        let gap = random(90, 100);
        let topHeight = random(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = topHeight - (gap * 10);

        this.topPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
    }

    update (deltaTime: number) {

        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

        if (this.isPass === false && this.topPipe.position.x < 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < (0 - this.scene.width / 1.5)) {
            this.game.createPipe();
            this.destroy();
        }
    }
}

