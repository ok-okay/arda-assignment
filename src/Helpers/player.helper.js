const players = require("../Models/players");

async function getPlayer(playerId) {
    try {
        const docs = await players.find({
            playerId: playerId
        }).exec();

        if (docs.length === 1) {
            return {
                status: 200,
                message: "Player exists!",
                player: docs[0]
            }
        } else {
            return {
                status: 404,
                message: "Player not found!"
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        };
    }
}

async function createPlayer(playerId) {
    const newPlayer = new players({
        playerId: playerId,
        tokens: 0,
        tokensToday: 0,
        usd: 0
    });
    try {
        await newPlayer.save();
        return {
            status: 200,
            message: "Added player!"
        }
    } catch (err) {
        return {
            status: 500,
            message: "Could not add player",
            error: err
        }
    }
}

async function patchPlayer(playerId, newPlayer) {
    try {
        const response = await players.findOneAndUpdate({
            playerId: playerId
        }, newPlayer)
        return {
            status: 200,
            message: "Patched player successfully"
        }
    } catch (err) {
        return {
            status: 500,
            message: "Could not patch player",
            error: err
        }
    }
}

async function getPlayersToPayout() {
    try {
        const docs = await players.find({
            tokens: {
                $gt: 0
            }
        }).exec();
        return {
            status: 200,
            message: "Players found!",
            players: docs
        }
    } catch (error) {
        return {
            status: 500,
            message: "Error encountered",
            error: error
        };
    }
}

async function findOrCreate(playerId) {
    try {
        const response = await getPlayer(playerId);
        if (response.status === 404) {
            const addPlayerResponse = await createPlayer(playerId);
            if (addPlayerResponse.status !== 200) {
                throw "New player adding failed"
            }
            return {
                status: 200,
                playerId: playerId,
                tokensToday: 0,
                tokens: 0                
            }
        }
        if(response.status===200){
            return {
                status: 200,
                message: "Got player",
                tokensToday: response.player.tokensToday,
                tokens: response.player.tokens                
            }
        }
        if(response.status===500){
            return {
                status: 500,
                message: "Error occured"
            }            
        }
    }
    catch(error){
        return {
            status: 500,
            message: "Error occured",
            error: error
        }
    }
}

module.exports = {
    getPlayer,
    createPlayer,
    patchPlayer,
    getPlayersToPayout,
    findOrCreate
}