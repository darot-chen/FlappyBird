import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component {

    @property({type: Label})
    public scoreLabel: Label = null!;

    @property({type: Label})
    public highScore: Label = null!;

    @property({type: Label})
    public resultEnd: Label = null!;

    private maxScore: number = 0;
    private currentScore: number = 0;

    updateScore(num: number) {
        this.currentScore = num;
        this.scoreLabel.string = num.toString();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResult();
    }

    showResult() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);

        this.highScore.string = 'High Score: ' + this.maxScore.toString();
        this.highScore.node.active = true;
        this.resultEnd.node.active = true;
    }

    hideResult() {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }


}

