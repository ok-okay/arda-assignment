const mongoose = require("mongoose");

const playerTokenSchema = {
    time: Object,
    playerId: String,
    tokens: Number,
    description: String
};

module.exports = mongoose.model("PlayerToken", playerTokenSchema);