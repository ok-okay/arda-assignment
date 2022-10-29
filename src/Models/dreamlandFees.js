const mongoose = require("mongoose");

const dreamlandFeesSchema = {
    time: Object,
    playerId: String,
    usd: Number,
    fees: {
        type: Number,
        min: 0
    },
    description: String
};

module.exports = mongoose.model("DreamlandFee", dreamlandFeesSchema);