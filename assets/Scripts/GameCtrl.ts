import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({ type: Ground })
    public ground: Ground = null!;

    @property({ type: Result })
    public result: Result = null!;

    @property({ type: Bird })
    public bird: Bird = null!;

    @property({ type: PipePool })
    public pipeQueue: PipePool = null!;

    @property({ type: BirdAudio })
    public clip: BirdAudio = null!;

    @property({ type: CCInteger })
    public gameSpeed: number = 200;

    @property({ type: CCInteger })
    public pipeSpeed: number = 200;

    public isOver: boolean = false;

    onLoad () {
        this.initListener();
        this.result.resetScore();
        this.isOver = true;
        director.pause();
    }

    resetGame () {
        this.result.resetScore();
        this.pipeQueue.resetPool();

        this.isOver = false;
        this.startGame();
    }

    startGame () {
        this.result.hideResult();
        director.resume();
    }

    gameOver () {
        this.result.showResult();
        this.isOver = true;
        this.clip.onAudioQueue(3);
        director.pause();
    }

    createPipe () {
        this.pipeQueue.addPool();
    }

    passPipe () {
        this.result.addScore();
        this.clip.onAudioQueue(1);
    }

    initListener () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Input.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            } else {
                this.bird.fly();
                this.clip.onAudioQueue(0);
            }
        }, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.result.addScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
                break;
        }
    }

    contactGroundPipe () {
        let collider = this.bird.getComponent(Collider2D)!;

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact () {
        this.bird.hitSomething = true;
        this.clip.onAudioQueue(2);
    }

    birdStruck () {
        this.contactGroundPipe();

        if (this.bird.hitSomething) {
            this.gameOver();
        }
    }

    update () {
        if (this.isOver == false) {
            this.birdStruck();
        }
    }

}

