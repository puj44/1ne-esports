const express = require('express');
const router = express.Router();
const auth = require('../controllers/authenticationcontroller');
const verifyToken = require('./verifyToken');

router.get("/signout",verifyToken,auth.signout);
router.get("/getstatus",auth.checkstatus);
router.get("/signin/:username/:password",auth.authenticate);

module.exports= router;