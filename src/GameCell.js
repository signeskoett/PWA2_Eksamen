import React, {Component} from 'react';
//import Game from "./Game";

class GameCell extends Component {
    constructor(props) {
        super(props);


    }

    componentWillMount(){

    }

    getStyleString = () => {
        let left = this.props.x.toFixed(0);
        let top = this.props.y.toFixed(0);
        let transform = '';
        if(this.props.dx < 0){
        // going RTL
        transform = 'scale(-1, 1) ';
        } else{
            // going LTR
            transform = 'scale(1, 1) ';
        }
        if(this.props.dy < 0){
            // going top to bottom
            transform += ' rotate(-20deg) ';
        } else{
            transform += ' rotate(20deg) ';
        }
        let style = {
            left: left+'px',
            top: top+'px',
            transform: transform,
        };
        return style;
    }
    clickEvent = () => {
        console.log('clicked');
        this.props.removeCell(this.props.id);
    }
    render() {
        return (
            <div style={this.getStyleString()} className={"spermcell"} onClick={this.clickEvent}>
                <img src={"/assets/images/sperm.gif"} alt="" className={this.props.type}/>
            </div>

        );
    }
}

export default GameCell;
