import React, {Component} from 'react';
import {Link} from "react-router-dom";

class  Name extends Component {

    render() {
        let list = [];
            this.props.scores.forEach((elm) => {
                list.push(
                <li>
                    <p>Name: {elm.Name}</p>
                    <p>Score: {elm.Score}</p>
                    <p>Location: {elm.Location}</p>
                    <hr/>
                </li>
                )
            });    

        return (
            <div>
                <Link to={"/Name"}><button type="button">Try again</button></Link>
                <div>
                    <h3>Your score</h3>
                    <p>Name: {this.props.name}</p>
                    <p>Location: {this.props.location}</p>
                    <p>Score: {this.props.score}</p>
                </div>
                <ul>{list}</ul>
            </div>
        );
    }
}

export default Name;