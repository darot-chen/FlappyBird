import { _decorator, CCFloat, Component, Animation, Vec3, tween, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({ type: CCFloat })
    public jumpHeight: number = 200;

    @property({ type: CCFloat })
    public jumpDuration: number = 0.3;

    public birdAnimation: Animation;
    public birdLocation: Vec3;

    public hitSomething: boolean = false;

    private rotation = new Quat(0, 0, 0, 0);

    onLoad () {
        this.resetBird();
        this.birdAnimation = this.getComponent(Animation)!;
    }

    resetBird () {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.node.setRotation(this.rotation);
        this.hitSomething = false;
    }

    fly () {
        this.birdAnimation.stop();

        tween(this.node.position)
            .to(
                this.jumpDuration,
                new Vec3(
                    this.node.position.x,
                    this.node.position.y + this.jumpHeight,
                    this.node.position.z
                ),
                {
                    easing: 'smooth',
                    onUpdate: (target: Vec3, ratio: number) => {
                        this.node.setPosition(target);
                        this.node.setRotation(this.rotation);
                    }
                }
            ).start();

        this.birdAnimation.play();
    }
}

