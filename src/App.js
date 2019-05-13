import React, { Component } from 'react';
import db from './db';
import { Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Location from "./location";
import Name from "./name";
import Game from "./NewGame";
import history from './history';
import Rankscore from './Rankscore';


class App extends Component {
  API_URL = "https://spermbank.herokuapp.com/api/";
  constructor() {
    super();
    this.state = { 
      Allscores: [],
      score: 4,
      sted: '',
      name: '',
      online: false
    };
    this.LocationSubmit = this.LocationSubmit.bind(this);
    this.NameSubmit = this.NameSubmit.bind(this);
    this.renderdata = this.renderdata.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.renderdata();
    this.interval = setInterval(() => this.renderdata(), 5000);
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData() {
    if(navigator.onLine) {
      fetch(`${this.API_URL}all`)
          .then(response => response.json())
          .then(data => {
              this.setState({
                Allscores: data
              });
              console.log(data)
          })
          .catch(error => {
              console.error("Error when fetching: ", error);
          })
    } else {
      db.table('Score')
      .toArray()
      .then((Score) => {
        this.setState({ 
          Allscores: Score
        });
      });
    }
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

  renderdata() {
    if(navigator.onLine) {
      this.setState({
        online: true
      })
    } else {
      this.setState({
        online: false
      })
    }
    if (navigator.onLine) {
      db.table('Score').toArray()
      .then((Score) => {
        console.log(Score.length)
        for (let i = 0; i < Score.length; i++) {
          let navn = Score[i].name;
          let lokation = Score[i].location;
          let nummer = Score[i].score;
          fetch(`${this.API_URL}add`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: navn,
            Location: lokation,
            Score: nummer
          })        
          })
          .catch(err => console.log(err));
        }
      db.table('Score').clear();
      this.getData();
      });
    }
  }

  render() { 
    return (
      <Router history={history}>
      <div className={this.state.online ? "container border_green" : "container border_red"}>
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
                            data={this.getData}></Game>}/>

                <Route exact path={'/Rank/:name/:score/:location'}
                     render={(props) =>
                         <Rankscore {...props} 
                         score={props.match.params.score}
                         name={props.match.params.name} 
                         location={props.match.params.location} 
                         scores={this.state.Allscores} 
                         renderdata={this.renderdata}></Rankscore>}/>

              <Route component={NotFound} />
          </Switch>

      </div>
  </Router>
    );
  }
}

export default App;
