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
//--------------------------------------FETCH ALL PLAYERS INFORMATION------------------------------------------
exports.showPlayers=function(req, res) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne'); //connect database
        (async ()=>{
            //fetch data from database
            const playersres= await db.collection('players').find({}).toArray();
            if(playersres.length>0){
                const filtered=playersres.filter(d=> d.name!==null);
                return res.status(200).send({playersArray:filtered});
            }
            else{
                console.log("s");
                return res.status(404).send("no data");
            }
        })();
    });
}
//-------------------------------FETCH ALL TEAMS INFORMATION WITH PLAYERS------------------------------------------
exports.showTeams=function(req, res) {
    
}