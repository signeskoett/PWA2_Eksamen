const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://timx0645:'+ process.env.PSW +'@cluster0-081uj.azure.mongodb.net/Scoreboard?retryWrites=true');
const Scoreboard = require('./models/scoreboard');
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(express.static(path.join(__dirname, '../build')));

/****** Configuration *****/
const port = (process.env.PORT || 8090);

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

/****** Routes *****/
//Fanger alle spørgsmål
app.get(`/api/all`, (req, res) => {
    Scoreboard.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => console.log(err));
});

//laver en kommentar her
app.post(`/api/add`, (req, res) => {
    if(!req.body.Name) {
        return res.status(401).send({
          success: 'false comment'
    })
    } else if(!req.body.Location) {
        return res.status(402).send({
          success: 'false comment'
    });
    } else if(!req.body.Score) {
        return res.status(403).send({
          success: 'false comment',
    });
    }
    const score = new Scoreboard({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        Location: req.body.Location,
        Score: req.body.Score,
      });
      score.save()
    .then(result => console.log(result))
    .catch(err =>
        res.status(500).send({
            success: 'false',
            message: err
            })
        );
    return res.status(201).send({
    message: 'Score added successfully', 
    score: score
    });
});

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`API running on port ${port}!`));
