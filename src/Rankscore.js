import React, {Component} from 'react';
import {Link} from "react-router-dom";

class  Name extends Component {

    render() {
        let list = [];
        let all_scores = this.props.scores.sort(function (a,b) {
            return b.Score - a.Score
        })
        for (let i = 0; i < this.props.scores.length; i ++ ) {
            list.push(
                <li>
                    <h2>{i + 1}</h2>
                    <p>Name: {all_scores[i].Name}</p>
                    <p>Score: {all_scores[i].Score}</p>
                    <p>Location: {all_scores[i].Location}</p>
                </li>
            )
        };  
         let pic = '';
         let msg = '';
        if (this.props.score > 50 ) {
            pic = 'awesome';
            msg='a designer baby';
        } else if ( this.props.score > 25 ) {
            pic = 'medium';
            msg='an okay baby';
        } else {
            pic = 'bad';
            msg='a retarded baby';
        }

        return (
            <div className="rank">
            <div className="score_y">
            <h3>Congrats you got {msg}</h3>
                <img src={'/assets/images/' + pic + '.png'} />
            </div>
                <div id="y_score">
                    <h3>Your score</h3>
                    <p>Name: {this.props.name}</p>
                    <p>Location: {this.props.location}</p>
                    <p>Score: {this.props.score}</p>
                </div>
                <Link to={"/Name"}><button type="button" className="btn">Try again</button></Link>
                <ul>{list}</ul>
            </div>
        );
    }
}

export default Name;