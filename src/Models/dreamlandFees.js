const mongoose = require("mongoose");

const dreamlandFeesSchema = {
    time: Object,
    playerId: String,
    usd: Number,
    fees: Number,
    description: String
};

module.exports = mongoose.model("DreamlandFee", dreamlandFeesSchema);