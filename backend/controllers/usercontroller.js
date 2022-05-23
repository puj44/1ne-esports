const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient , ObjectId} = require('mongodb');
const cookieParser = require('cookie-parser');

app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());

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
exports.showTeams=function(req, res) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne'); //connect database
        (async ()=>{
            //fetch data from database
            const playersres= await db.collection('teams').find({}).toArray();
            if(playersres.length>0){
                console.log(playersres);
                const filtered=playersres.map((data,idx)=> {return {name:data.name,description:data.description}});
                return res.status(200).send({teamsArray:filtered});
            }
            else{
                return res.status(404).send("no data");
            }
        })();
    });
}
//-------------------------------FETCH ALL TEAMS INFORMATION WITH PLAYERS------------------------------------------
exports.showPlayers=function(req, res) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne'); //connect database
        let teams=[];
        let players=[];
        (async ()=>{
            //fetch data from database
            const result = await db.collection('teams').find({}).toArray();//teams fetch
                if(result.length>0){
                    for(var i=0;i<result.length;i++){
//----------------------------------fetching players details from fetched player id's of teams database--------------------------------
                        for(var j=1;j<=4;j++){
                            const pid=result[i]['Player'+j]; 
                            if(pid!=null){
                                const result2=await db.collection('players').find({'_id':ObjectId(pid)}).toArray();
                                if(result2){
                                    players.push({pid:result2[0]['_id'],pname:result2[0]['name'],pdesc:result2[0]['description']});
                                }
                            }
                        }
//----------------------------------storing teams and players into an array {id:teamname,teamdesc,playerid,playername,playerdesc}
                        const filtered=players.filter(d=> d.pname!==null);
                        teams.push({id:result[i]['_id'],name:result[i]['name'],filtered});
                        players=[];
                    }
                    if(teams.length>0){//send result
                        client.close();
                        return res.status(200).send({teamsArray:teams});
                    }
                    else{
                        return res.status(404).send("no data");
                    }
                }
                else{
                    return res.status(404).send("no data");
                }
        })();
    });
}
//----------------------------------fetch all Events to display in calendar-----------------------------------
exports.showEvents=function(req,res){
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
            const db = client.db('esports_1ne');
            (async ()=>{
                //-------------query for fetching all events---------------------
                const result = await db.collection('events').find({}).toArray();
                if(result) {
                    //----deleting id item from response----
                    result.forEach((item)=>{
                        delete item._id;
                    })
                    client.close();
                    //---sending response to user side---
                    res.status(200).send({eventResult:result});
                }else {
                    res.status(400).send('not found!');
                }
            })();
        });
}
//----------------------------------fetch all Game Night Schedule's to display in calendar-----------------------------------
exports.showCG=function(req,res){
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
            const db = client.db('esports_1ne');
            (async ()=>{
                //-------------query for fetching all Schedules---------------------
                const result = await db.collection('game_night').find({}).toArray();
                if(result) {
                    //----deleting id item from response----
                    result.forEach((item)=>{
                        delete item._id;
                    })
                    client.close();
                    //---sending response to user side---
                    res.status(200).send({cgnResult:result});
                }else {
                    res.status(400).send('not found!');
                }
            })();
        });
}
