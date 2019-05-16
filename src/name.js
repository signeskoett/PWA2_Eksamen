import React, {Component} from 'react';
import history from './history';

class  Name extends Component {
    componentDidMount() {
        if(this.props.l === '') {
            history.push('/');
        }
    }

    render() {
        return (
            <div className="midt">
            <h3>Location: {this.props.l}</h3>
               <form onSubmit={this.props.NameSubmit}>
                   <p>Name:</p>
                   <input name="name" type="text" />
                   <br/>
                   <input value="Start" type="submit" className="submit"/>
               </form>
            </div>
        );
    }
}

export default Name;
