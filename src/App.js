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
      score: 4,
      sted: '',
      name: ''
    };
    this.LocationSubmit = this.LocationSubmit.bind(this);
    this.NameSubmit = this.NameSubmit.bind(this);
    this.Addscore = this.Addscore.bind(this);
  }

  componentDidMount() {
    db.table('Score')
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

  Addscore() {
    const score = {
      name: this.state.name,
      location: this.state.sted,
      score: this.state.score
    };
    db.table('Score')
      .add(score)
      .then((id) => {
        const newscore = [...this.state.Allscores, Object.assign({}, score, { id })];
        this.setState({ Allscores: newscore });
      });
      history.push("/Rank");
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
                            score={this.state.score}
                            submit={this.Addscore}></Game>}/>

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
