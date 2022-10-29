const express = require("express");
const router = express.Router();
const playerControllers = require("../Controllers/player.controllers");

router.get("/:playerId", playerControllers.getPlayer);

module.exports = router;