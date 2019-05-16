import React, {Component} from 'react';
import {Link} from "react-router-dom";

class  Name extends Component {

    render() {
        let list = [];
        for (let i = 0; i < this.props.scores.length; i ++ ) {
            list.push(
                <li>
                    <h2>{i + 1}</h2>
                    <p>Name: {this.props.scores[i].Name}</p>
                    <p>Score: {this.props.scores[i].Score}</p>
                    <p>Location: {this.props.scores[i].Location}</p>
                </li>
            )
        };    

        return (
            <div className="rank">
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