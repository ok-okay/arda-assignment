const playerHelper = require("../Helpers/player.helper");
const tokenHelper = require("../Helpers/token.helper");
const constants = require("../Constants/index");

const getTokensHistory = async (req, res) => {
    const playerId = req.params.playerId;
    if (typeof (playerId) !== 'string') {
        return res.status(400).json({
            status: 400,
            message: "Player ID is supposed to be a string"
        });
    }
    const response = await tokenHelper.getTokenHistory(playerId);
    return res.status(response.status).json(response);
}

const addTokens = async (req, res) => {
    try {
        if (req.body.playerId === undefined) {
            throw "Player ID missing in body";
        }
        const playerId = req.body.playerId;
        if (typeof (playerId) !== 'string') {
            throw "Player ID must be a string";
        }

        if (req.body.time === undefined) {
            throw "Time missing in body";
        }
        const time = new Date(req.body.time);
        if (isNaN(time)) {
            throw "Invalid Time";
        }

        if (req.body.tokens === undefined) {
            throw "Tokens missing in body";
        }
        const tokens = req.body.tokens;
        if (typeof (tokens) !== 'number') {
            throw "Tokens must be a valid number";
        }

        let prevTokens = 0,
            curTokens = 0;
        const response = await playerHelper.findOrCreate(playerId);
        if (response.status !== 200) {
            throw "New player adding failed"
        }
        prevTokens = response.tokensToday;
        curTokens = response.tokens;

        if (prevTokens === constants.MAX_TOKENS) {
            return res.status(500).json({
                status: 500,
                message: "Daily limit reached!"
            })
        } else {
            let totalTokens = Math.min(tokens + prevTokens, constants.MAX_TOKENS);
            const newPlayer = {
                tokensToday: totalTokens,
                tokens: totalTokens - prevTokens + curTokens
            }
            const patchPlayer = await playerHelper.patchPlayer(playerId, newPlayer);
            if (patchPlayer.status !== 200) {
                throw "Error encountered in updating player info";
            }
            const addToPlayerRes = await tokenHelper.addToPlayer(time, playerId, totalTokens - prevTokens, "New tokens debit");
            if (addToPlayerRes.status !== 200) {
                throw "Error encountered in creating ledger entry for players";
            }
            const addToDreamlandRes = await tokenHelper.addToDreamland(time, playerId, prevTokens - totalTokens, "New tokens credit");
            if (addToDreamlandRes.status !== 200) {
                throw "Error encountered in creating ledger entry for Dreamland";
            }
            return res.status(200).json({
                status: 200,
                message: "Added tokens successfully"
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error encountered",
            error: error
        })
    }
}

module.exports = {
    getTokensHistory,
    addTokens
}