const players = require("../Models/players");

const getPlayer = async (req, res) => {
    const playerId = req.params.playerId;
    if(typeof(playerId)!=='string'){
        throw "Player ID must be a string";
    }
    try{
        const docs = await players.find({playerId: playerId});
        if(docs.length===1){
            const player = docs[0];
            return res.status(200).json({
                status: 200,
                playerId: playerId,
                tokensToday: player.tokensToday,
                usd: player.usd
            })
        }
    }
    catch(error){
        return res.status(500).json({
            status: 500,
            message: "Error encountered",
            error: error
        })
    }
}

module.exports = {
    getPlayer
}