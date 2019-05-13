const mongoose = require('mongoose');
const scoreboard = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    Location: String,
    Score: Number
});

module.exports = mongoose.model('Scoreboard', scoreboard);
