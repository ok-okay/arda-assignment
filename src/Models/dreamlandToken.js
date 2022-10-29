const mongoose = require("mongoose");

const dreamlandTokenSchema = {
    time: Object,
    playerId: String,
    tokens: Number,
    description: String
};

module.exports = mongoose.model("DreamlandToken", dreamlandTokenSchema);