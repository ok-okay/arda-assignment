const express = require("express");
const router = express.Router();
const tokenControllers = require("../Controllers/token.controllers");

router.get("/:playerId", tokenControllers.getTokensHistory);
router.post("/", tokenControllers.addTokens);

module.exports = router;