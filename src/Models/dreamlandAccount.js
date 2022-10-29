const mongoose = require("mongoose");

const dreamlandAccountSchema = {
    time: Object,
    playerId: String,
    fees: Number,
    description: String
};

module.exports = mongoose.model("DreamlandAccount", dreamlandAccountSchema);