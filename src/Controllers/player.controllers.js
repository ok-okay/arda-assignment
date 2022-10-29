const playerHelper = require("../Helpers/player.helper");

const getPlayer = async (req, res) => {
    const playerId = req.params.playerId;
    if (typeof (playerId) !== 'string') {
        throw "Player ID must be a string";
    }
    try {
        const response = await playerHelper.getPlayer(playerId);
        return res.status(response.status).json(response);
    } catch (error) {
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