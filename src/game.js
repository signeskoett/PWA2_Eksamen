import React, {Component} from 'react';

class  Game extends Component {

    render() {
        return (
            <div>
             <div class="score">
             {this.props.name}
             <hr/>
             {this.props.location}
             <hr/>
             {this.props.score}
             </div>
             <div class="game">
             <button onClick={this.props.submit}>Check scores</button>
             </div>
            </div>
        );
    }
}

export default Game;
