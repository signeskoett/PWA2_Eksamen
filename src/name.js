import React, {Component} from 'react';

class  Name extends Component {

    render() {
        return (
            <div>
                {this.props.l}
               <form onSubmit={this.props.NameSubmit}>
               <p>
                   Name:
                   <input name="name" type="text" />
               </p>
               <input value="Start" type="submit"/>
               </form>
            </div>
        );
    }
}

export default Name;
