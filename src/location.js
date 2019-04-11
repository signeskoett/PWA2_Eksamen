import React, {Component} from 'react';

class Location extends Component {

    render() {
        return (
            <div>
               <form onSubmit={this.props.LocationSubmit}>
               <p>
                   Location:
                   <input name="location" type="text" />
               </p>
               <input value="Add Location" type="submit"/>
               </form>
            </div>
        );
    }
}

export default Location;
