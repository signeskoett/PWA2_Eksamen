import React, {Component} from 'react';

class Location extends Component {

    render() {
        return (
            <div className="midt">
               <form onSubmit={this.props.LocationSubmit}>
                   <p>Location:</p>
                   <input name="location" type="text" />
                   <br/>
                   <input value="Add Location" type="submit" className="submit"/>
               </form>
            </div>
        );
    }
}

export default Location;
