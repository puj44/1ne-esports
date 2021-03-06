const express = require('express');
const router = express.Router();
const admin = require('../controllers/admincontroller');
const verifyToken = require('./verifyToken');
router.post("/addplayer",verifyToken,admin.addPlayer);
router.delete("/delplayer",verifyToken,admin.delPlayer);
router.post("/updateplayer",verifyToken,admin.updatePlayer);
router.get("/players/all",verifyToken,admin.displayAll);
router.get("/players/:name",verifyToken,admin.disPlayer);
router.post("/add/CG",verifyToken,admin.addCG);
router.get("/CG/all",verifyToken,admin.displayCG);
router.post("/add/event",verifyToken,admin.addEvent);
router.get("/event/all",verifyToken,admin.displayEvent);
module.exports= router;