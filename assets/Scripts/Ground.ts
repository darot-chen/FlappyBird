import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {

    @property({ type: Node })
    public ground1: Node = null!;

    @property({ type: Node })
    public ground2: Node = null!;

    @property({ type: Node })
    public ground3: Node = null!;

    public groundWidth1: number = 0;
    public groundWidth2: number = 0;
    public groundWidth3: number = 0;

    public tempStartLocation1: Vec3 = new Vec3();
    public tempStartLocation2: Vec3 = new Vec3();
    public tempStartLocation3: Vec3 = new Vec3();

    public gameCtrlSpeed = new GameCtrl();
    public gameSpeed: number = 50;


    onLoad () {
        this.startUp();
    }

    startUp () {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }

    update (deltaTime: number): void {
        this.gameSpeed = this.gameCtrlSpeed.gameSpeed;

        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;

        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        if (this.tempStartLocation1.x < (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        if (this.tempStartLocation2.x < 0 - this.groundWidth2) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        if (this.tempStartLocation3.x < 0 - this.groundWidth3) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);
    }
}

