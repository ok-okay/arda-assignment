const playerAccount = require("../Models/playerAccount");

async function addToPlayerAccount(time, playerId, tokens, usd, description) {
    try {
        const newEntryPlayerAccount = new playerAccount({
            time: time,
            playerId: playerId,
            tokens: tokens,
            usd: usd,
            description: description
        });
        await newEntryPlayerAccount.save();
        return {
            status: 200,
            message: "Entry created in player bank account"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        }
    }
}

async function getUSDWonHistory(playerId, time) {
    try {
        const playerAccountBook = await playerAccount.find({
            playerId: playerId,
            time: {
                $lte: time
            },
            usd: {
                $gt: 0
            }
        }).exec();
        return {
            status: 200,
            message: "Got player account book",
            docs: playerAccountBook
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        }
    }
}

module.exports = {
    addToPlayerAccount,
    getUSDWonHistory
}