import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Rank from './score';

class  Name extends Component {

    render() {
        let list = [];
        if (navigator.onLine) {
            this.renderdata();
            Rank.find()._rejectionHandler0.forEach((elm) => {
                list.push(
                <li>
                    <p>Name: {elm.name}</p>
                    <p>Score: {elm.score}</p>
                    <p>Location: {elm.location}</p>
                    <hr/>
                </li>
                )
            });
        } else {
            this.props.scores.forEach((elm) => {
                list.push(
                <li>
                    <p>Name: {elm.name}</p>
                    <p>Score: {elm.score}</p>
                    <p>Location: {elm.location}</p>
                    <hr/>
                </li>
                )
            });
        }
      

        return (
            <div>
                <Link to={"/Name"}><button type="button">Try again</button></Link>
                <ul>{list}</ul>
            </div>
        );
    }
}

export default Name;