const dreamlandToken = require("../Models/dreamlandToken")
const playerToken = require("../Models/playerToken");
const date = require("./date.helper");

async function addToPlayer(time, playerId, tokens, description) {
    try {
        const newEntryPlayer = new playerToken({
            time: time,
            playerId: playerId,
            tokens: tokens,
            description: description
        });
        await newEntryPlayer.save();
        return {
            status: 200,
            message: "Entry created in players token table"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        }
    }
}

async function addToDreamland(time, playerId, tokens, description) {
    try {
        const newEntryDreamland = new dreamlandToken({
            time: time,
            playerId: playerId,
            tokens: tokens,
            description: description
        });
        await newEntryDreamland.save();
        return {
            status: 200,
            message: "Entry created in dreamland token table"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        }
    }
}

async function getTokenHistory(playerId) {
    try {
        const history = await playerToken.find({
            playerId: playerId,
            time: {
                $gte: date.getDayStart(),
                $lte: date.getNow()
            }
        })
        return {
            status: 200,
            message: "Fetched tokens won by player",
            tokens: history
        }
    } catch (err) {
        return {
            status: 500,
            message: "Error encountered",
            error: err
        }
    }

}

module.exports = {
    addToPlayer,
    addToDreamland,
    getTokenHistory
}