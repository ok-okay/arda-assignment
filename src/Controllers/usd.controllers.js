const constants = require("../Constants/index");
const playerHelper = require("../Helpers/player.helper");
const tokenHelper = require("../Helpers/token.helper");
const usdHelper = require("../Helpers/usd.helper");
const dateHelper = require("../Helpers/date.helper");
const feesHelper = require("../Helpers/fees.helper");

const getUSDHistory = async (req, res) => {
    const playerId = req.params.playerId;
    if (typeof (playerId) !== 'string') {
        res.status(400).json({
            status: 400,
            message: "Player ID is supposed to be a string"
        })
    }
    const inputTime = (req.body.time !== undefined ? new Date(req.body.time) : dateHelper.getNow());
    const time = (isNaN(inputTime.getDate()) ? "Time format wrong" : inputTime);
    if (typeof (time) !== 'object') {
        res.status(400).json({
            status: 400,
            message: "Time format wrong"
        })
    }
    try {
        const usdWonHistory = await usdHelper.getUSDWonHistory(playerId, time);
        return res.status(usdWonHistory.status).json(usdWonHistory);
    } catch (error) {
        res.send(500).json({
            status: 500,
            message: "Error encountered!",
            error: error
        })
    }
}

const convertToUSD = async (req, res) => {
    try {
        const payoutResponse = await playerHelper.getPlayersToPayout();
        if (payoutResponse.status !== 200) {
            throw "Couldn't get players to payout!";
        } else {
            docs = payoutResponse.players;
            for (let i = 0; i < docs.length; i++) {
                let player = docs[i];
                let time = dateHelper.getNow();
                let patchResponse = await playerHelper.patchPlayer(player.playerId, {
                    tokens: 0,
                    tokensToday: (time.getHours() === 0 ? 0 : player.tokensToday),
                    usd: (player.tokens * constants.TOKEN_TO_USD)
                })
                if (patchResponse.status !== 200) {
                    throw "Error encountered while patching player";
                }
                let addToPlayerRes = await tokenHelper.addToPlayer(time, player.playerId, -player.tokens, "Tokens converted to USD (Credit)");
                if (addToPlayerRes.status !== 200) {
                    throw "Error encountered in creating ledger entry for players";
                }
                let addToPlayerAccRes = await usdHelper.addToPlayerAccount(time, player.playerId, player.tokens, player.tokens * constants.TOKEN_TO_USD, "Tokens converted to USD (Debit)");
                if (addToPlayerAccRes.status !== 200) {
                    throw "Error encountered in creating ledger entry for Player account";
                }
                let addToDreamlandFees = await feesHelper.addToDreamlandFees(time, player.playerId, -player.tokens * constants.TOKEN_TO_USD, (player.tokens * constants.TOKEN_TO_USD) * constants.USD_TO_FEES, "USD converted to Fees (Debit)");
                if(addToDreamlandFees.status!==200){
                    throw "Error encountered in creating ledger entry for fees in dreamland fees account";
                }
                let addToDreamlandAccount = await feesHelper.addToDreamlandAccount(time, player.playerId, -(player.tokens * constants.TOKEN_TO_USD) * constants.USD_TO_FEES, "USD converted to Fees (Credit)");
                if(addToDreamlandAccount.status!==200){
                    throw "Error encountered in creating ledger entry for fees in dreamland bank account";
                }
            }
            res.status(200).json({
                status: 200,
                message: "Converted tokens to USD"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error encountered",
            error: error
        })
    }
}

module.exports = {
    getUSDHistory,
    convertToUSD
}