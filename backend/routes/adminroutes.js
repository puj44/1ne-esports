const express = require('express');
const router = express.Router();
const admin = require('../controllers/admincontroller');
router.post("/addplayer",admin.addPlayer);
router.delete("/delplayer",admin.delPlayer);
router.post("/updateplayer",admin.updatePlayer);
router.get("/players/all"),admin.displayAll);
router.get("/players/:name"),admin.disPlayer);
module.exports= router;