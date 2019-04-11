import React, { Component } from 'react';
import db from './db';
import { Router, Route, Link, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Location from "./location";
import Name from "./name";
import Game from "./game";
import history from './history';
import Rankscore from './Rankscore';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      Allscores: [],
      score: 0,
      sted: '',
      name: ''
    };
    this.LocationSubmit = this.LocationSubmit.bind(this);
    this.NameSubmit = this.NameSubmit.bind(this);
  }

  componentDidMount() {
    db.table('Rankscore')
      .toArray()
      .then((Score) => {
        this.setState({ 
          Allscores: Score
        });
      });
  }

  LocationSubmit(event) {
    event.preventDefault();
    const location = event.target.location.value;
    this.setState({ sted: location });
    history.push("/Name");
  }

  NameSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    this.setState({ name: name });
    history.push("/Game");
  }

  render() {
    return (
      <Router history={history}>
      <div className="container">
          <Switch>
              <Route exact path={'/'}
                     render={(props) =>
                         <Location {...props} LocationSubmit={this.LocationSubmit}></Location>}/>

              <Route exact path={'/Name'}
                     render={(props) =>
                         <Name {...props} l={this.state.sted} NameSubmit={this.NameSubmit}></Name>}/>
              
              <Route exact path={'/Game'}
                     render={(props) =>
                         <Game {...props} 
                            location={this.state.sted} 
                            name={this.state.name} 
                            score={this.state.score}></Game>}/>

                <Route exact path={'/Rank'}
                     render={(props) =>
                         <Rankscore {...props} scores={this.state.Allscores}></Rankscore>}/>

              <Route component={NotFound} />
          </Switch>

      </div>
  </Router>
    );
  }
}

export default App;
