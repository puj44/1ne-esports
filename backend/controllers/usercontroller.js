const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient , ObjectId} = require('mongodb');
const cookieParser = require('cookie-parser');

app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
/**
 * @apiVersion 0.2.0
 * @api {post} /auth/signin signin or authenticate a user.
 * @apiSuccess {cookie} Token containing id and type of user details.
 * @apiSuccess {String} userType type of user.
 * @apiSuccess {Object[]} Links Available links for user.
 * @apiError Wrong password The provided password was wrong.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
*/

const uri = process.env.mongo_url;

exports.showPlayers=function(req, res) {

}

exports.showTeams=function(req, res) {
    
}