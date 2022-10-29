const mongoose = require("mongoose");

const playerSchema = {
    playerId: String,
    tokens: Number,
    tokensToday: Number,
    usd: Number
};

module.exports = mongoose.model("Player", playerSchema);