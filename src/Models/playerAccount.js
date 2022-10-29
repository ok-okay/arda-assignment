const mongoose = require("mongoose");

const playerAccountSchema = {
    time: Object,
    playerId: String,
    tokens: Number,
    usd: Number,
    description: String
};

module.exports = mongoose.model("PlayerAccount", playerAccountSchema);