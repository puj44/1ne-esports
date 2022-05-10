const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');
router.get('/players/display',user.showPlayers);
router.get('/teams/display',user.showTeams);
router.get('/events/display',user.showEvents);
router.get('/cg/display',user.showCG);
module.exports = router;