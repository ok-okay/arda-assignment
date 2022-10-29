const dreamlandAccount = require("../Models/dreamlandAccount");
const dreamlandFees = require("../Models/dreamlandFees");

async function addToDreamlandFees(time, playerId, usd, fees, description) {
    const feesEntry = new dreamlandFees({
        time: time,
        playerId: playerId,
        usd: usd,
        fees: fees,
        description: description
    })
    try {
        await feesEntry.save();
        return {
            status: 200,
            message: "Entry created in Dreamland fees account"
        }
    } catch (err) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        }
    }
}

async function addToDreamlandAccount(time, playerId, fees, description) {
    const accountEntry = new dreamlandAccount({
        time: time,
        playerId: playerId,
        fees: fees,
        description: description
    })
    try {
        await accountEntry.save();
        return {
            status: 200,
            message: "Entry created in Dreamland bank account"
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
    addToDreamlandFees,
    addToDreamlandAccount
}