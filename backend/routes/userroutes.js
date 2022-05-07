const express = require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');
router.get('/players/display',user.showPlayers);
router.get('/teams/display',user.showTeams);
module.exports = router;