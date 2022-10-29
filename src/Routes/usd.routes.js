const express = require("express");
const router = express.Router();
const usdControllers = require("../Controllers/usd.controllers");

router.get("/", usdControllers.convertToUSD);
router.post("/:playerId", usdControllers.getUSDHistory);

module.exports = router;