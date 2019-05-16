import React, {Component} from 'react';
import UUID from "uuid";
import db from "./db";
import history from './history';
import GameCell from "./GameCell";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {
                maxMoveX: 5,
                maxMoveY: 5,
                minMoveX: 1.5,
                minMoveY: 1.5,
                framePerSecond: 30,
                goodBalls: 20,
                badBalls: 7,
                goodBallScore: 2,
                badBallScore: -5,
                time: 30,
            },
            currentScore: 0,
            timeLeft: 0,
            canvas: '',
            balls: [],
            runInterval: {},
            cells: [],
            name: '',
            location: ''
        }
    };

    componentDidMount() {
        if(this.props.location === '') {
            history.push('/');
        }
        this.setState({
            canvas: document.getElementById('gameboard'),
        })
        this.setState({
            name: this.props.name,
            location: this.props.location,
        })
        this.addCells();
        this.run();
    }

    getMovementVal = (max, min) => {
        return (Math.random() * (max - min) + min).toFixed(2) * ( Math.floor(Math.random()*2) === 1 ? 1 : -1 );
    }



    removeCell = (id) => {
        let clickedCell = this.state.cells.find(x => {
            return x.id == id;
        });
        let score = parseInt(clickedCell.score);
        let type = clickedCell.type;
        let newScore = this.state.currentScore + score;
        this.setState({
            currentScore: newScore
        });

        let cells = this.state.cells.filter(x => {
            return x.id != id;
        });
        let newCell = this.getNewCell(type);
        cells.push(newCell);
        this.setState({
            cells: cells,
        })
    };
    getNewCell = (type) => {
        let game = this;
        let newCell = {
            id: UUID.v4(),
            x: Math.random() * (game.canvas.offsetWidth - (game.canvas.offsetWidth-game.canvas.offsetWidth)) + (game.canvas.offsetWidth-game.canvas.offsetWidth),
            y: Math.random() * (game.canvas.offsetHeight - (game.canvas.offsetHeight-game.canvas.offsetHeight)) + (game.canvas.offsetHeight-game.canvas.offsetHeight),
            dx: game.getMovementVal(game.state.settings.maxMoveX, game.state.settings.minMoveX),
            dy: game.getMovementVal(game.state.settings.maxMoveY, game.state.settings.minMoveY),
            type: type,
        };
        if(type == 'good'){
            newCell.score = game.state.settings.goodBallScore;
        } else if(type == 'bad'){
            newCell.score = game.state.settings.badBallScore;
        }
        return newCell;
    };
    addCells = () => {
        let tempCells = [];
        let game = this;

        for(let i=0; i < this.state.settings.goodBalls; i++)
        {

            let newCell = {
                id: UUID.v4(),
                x: Math.random() * (game.canvas.offsetWidth - (game.canvas.offsetWidth-game.canvas.offsetWidth)) + (game.canvas.offsetWidth-game.canvas.offsetWidth),
                y: Math.random() * (game.canvas.offsetHeight - (game.canvas.offsetHeight-game.canvas.offsetHeight)) + (game.canvas.offsetHeight-game.canvas.offsetHeight),
                dx: this.getMovementVal(this.state.settings.maxMoveX, this.state.settings.minMoveX),
                dy: this.getMovementVal(this.state.settings.maxMoveY, this.state.settings.minMoveY),
                type: "good",
                score: game.state.settings.goodBallScore,
            }
            tempCells.push(newCell);
        }


        for( let i=0; i<this.state.settings.badBalls; i++)
        {
            let newCell = {
                id: UUID.v4(),
                x: Math.random() * (game.canvas.offsetWidth - (game.canvas.offsetWidth-game.canvas.offsetWidth)) + (game.canvas.offsetWidth-game.canvas.offsetWidth),
                y: Math.random() * (game.canvas.offsetHeight - (game.canvas.offsetHeight-game.canvas.offsetHeight)) + (game.canvas.offsetHeight-game.canvas.offsetHeight),
                dx: this.getMovementVal(this.state.settings.maxMoveX, this.state.settings.minMoveX),
                dy: this.getMovementVal(this.state.settings.maxMoveY, this.state.settings.minMoveY),
                type: "bad",
                score: game.state.settings.badBallScore,
            }
            tempCells.push(newCell);
        }

        this.setState({
            cells: tempCells,
        })
    };

    endGame = () => {
        let root = this;

        this.setState({
            cells: [],
        })
    };

    run = () => {
        let root = this;
        this.gameTick();
        this.startTimer();
        setTimeout(function(){
            /*root.showScoreboard();
            root.resetInterval();
            root.clearGame();
            */
        }, this.state.settings.time * 1000)

        return true;
    };



    moveCells = () => {
        let cells = this.state.cells;
        let canvas = this.canvas;
        let newCells = [];
        for( let i = 0; i<cells.length; i++){
            let cell = cells[i];
            let x = cell.x;
            let y = cell.y;

            let dx = cell.dx;
            let dy = cell.dy;

            // boundary logic
            if(x < 0){
                cell.dx = Math.abs(dx);
            } else if(x > canvas.offsetWidth){
                cell.dx = -Math.abs(dx);
            }

            if(y<0){
                cell.dy = Math.abs(dy);
            } else if(y > canvas.offsetHeight){
                cell.dy = -Math.abs(dy);
            }

            cell.x+=cell.dx;
            cell.y+=cell.dy;

            newCells.push(cell);
        }

        this.setState({
            cells: newCells,
        })

    };

    gameTick = () => {
        let root = this;
        let gameTickInterval = setInterval( function( ) {
            if(root.state.timeLeft > 0){
                root.moveCells();
            } else{
                clearInterval(this);
            }
        }, 1000 / root.state.settings.framePerSecond);
    };

    startTimer = () => {
        let root = this;
        this.setState({
            timeLeft: this.state.settings.time,
        })
        this.timerInterval = setInterval(() => {
            if(root.state.timeLeft > 1){
                root.setState({
                    timeLeft: root.state.timeLeft -= 1
                });
            } else {
                root.setState({
                    timeLeft: "Slut",
                })
                clearInterval(this.timerInterval)
                root.endGame();
                const score = {
                    Name: this.props.name,
                    Location: this.props.location,
                    Score: this.state.currentScore
                  };
                  db.table('Score').add(score);
                  this.props.data();
                  history.push(`/Rank/${this.props.name}/${this.state.currentScore}/${this.props.location}`);
                }
        }, 1000 )
    };

    render() {
        return (
            <div>
                <div class="score_et">
                    <p>
                        <div id={"timer"}>
                        <strong>Time:</strong> {this.state.timeLeft}
                        </div>
                    </p>
                </div>
                <div class="score_to">
                    <p>
                        <strong>Score:</strong> {this.state.currentScore}
                    </p>
                </div>
                <div ref={node => this.canvas = node}
                    id={"gameboard"} style={{height: 500 + 'px'}}>
                    {this.state.cells.map((el) =>
                        <GameCell
                            id={el.id}
                            x={el.x}
                            y={el.y}
                            dx={el.dx}
                            dy={el.dy}
                            type={el.type}
                            score={el.score}
                            removeCell={this.removeCell}
                        />
                    )}
                </div>
                <div id={"score-1"} style={{display: "none"}}>
                </div>
                <div id={"score-2"} style={{display: "none"}}>
                </div>
                <div id={"score-3"} style={{display: "none"}}>
                </div>
            </div>
        );
    }
}

export default Game;
