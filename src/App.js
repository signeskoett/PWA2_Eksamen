import React, { Component } from 'react';
import db from './db';

class App extends Component {
  constructor() {
    super();
    this.state = { Score: [] };
  }

  componentDidMount() {
    db.table('Score')
      .toArray()
      .then((Score) => {
        this.setState({ Score });
      });
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
