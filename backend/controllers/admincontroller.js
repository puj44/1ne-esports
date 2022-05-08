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

exports.displayAll=function(req,res){ //display all teams and its players
    const token = req.cookies.token1;
    if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        let teams=[];
        let players=[];
        const db = client.db('esports_1ne');
        (async ()=>{
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
                        teams.push({id:result[i]['_id'],name:result[i]['name'],desc:result[i]['description'],players});
                        players=[];
                    }
                    if(teams.length>0){//send result
                        client.close();
                        return res.status('200').send({teamsArray:teams});
                    }
                    else{
                        return res.status(403).send("no data");
                    }
                }
                else{
                    return res.status(404).send("no data");
                }
            })();
        });
}
exports.addPlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined)
    return res.status(403).send(result);
        MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
            if (err) throw err
            const name=req.body.name;
            const desc=req.body.desc;
            const team=req.body.details;
            let pid=[];
           //to add teams and players
            if(name.length < 100 && desc.length < 300 && name!==null && desc!==null){
                const db = client.db('esports_1ne');
                (async ()=>{
                    const teamid= new ObjectId();
                    for(var i=0;i<team.length;i++){ //adding players
                        if(team[i]==null && i!==3){
                            res.status(401).send(err);
                        }
                        else{
                            const toBeInserted={'name':team[i]['pname'],'description':team[i]['pdesc']};//insert player details
                            const result=await db.collection('players').insertOne(toBeInserted);
                                if(result){
                                    pid.push(result.insertedId);
                                    
                                }
                                else{
                                    return res.status(402).send('err');
                                }
                        }
                    }
                    
                    const toBeInserted={'_id':teamid,'name':name,'description':desc,'Player1':pid[0],'Player2':pid[1],'Player3':pid[2],'Player4':pid[3]};
                    db.collection('teams').insertOne(toBeInserted,(err, object)=> {
                        if(object){
                            client.close();
                            return res.status(200).send('OK!');            
                        }
                        else{
                            return res.status(402).send('err');
                        }
                    });
                })();
                
            }
            else{
                res.status(402).send('Length exceed');
            }
        });
}
exports.delPlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const id=req.body.id; // team or player id
        const value=req.body.value; // check whether the id is of team or player
        const db = client.db('esports_1ne');
//-------------------------------find players for deletion--------------------------------------------------------
        (async ()=>{
            let ele='';
            if(value===1){
                let pid='';
                ele=db.collection('teams'); // set collection to teams if id is of team
                const result = await ele.find({'_id':ObjectId(id)}).toArray(); // retrieve player id's
                if(!result){return res.status(400).send("not found");}
//-----------------------players deletion from team's database-----------------------------------------
                let playerres=0;
                
                for(var j=1;j<=4;j++){
                    const pid=result[0]["Player"+j];
                    if(pid){
                         playerres= db.collection('players').findOneAndDelete({'_id':ObjectId(pid)}); // deletes players one by one
                    }
                }
//-----------------------delete the player or team from database using id------------------------------
                if(playerres){
                    const teamdel = ele.findOneAndDelete({'_id':ObjectId(id)});
                    if(teamdel){
                        return res.status(200).send("deleted");
                    }
                    else{
                        return res.status(404).send("not found");
                    }
                }
                else{
                    return res.status(402).send(err);
                }
            }
            else{
                    ele=db.collection('players'); // set collection to players
                    ele.updateOne({ '_id':  ObjectId(id)},{$set:{'name':null,'description':null}},function(err,object){ // delete player from players database -> set null to the player for replacing the player in near future
                        if(object){
                                client.close();
                                return res.status(200).send("deleted");
                            }
                        else{
                            return res.status(402).send(err);
                        }
                    });
                } 
        })();
    });
}
//-------------------------edit team/player-----------------------------------------------------------
exports.updatePlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const team=req.body.team; //fetch teams
        const players=req.body.players; //fetch players
        console.log(players);
//----------------------------update team and player details-------------------------------------------
        const {tname,tdesc}= team;
        if(tname && tdesc){
            const db = client.db('esports_1ne');
            (async ()=>{
//----------------------------update team details-----------------------------------------------------
                  const teamres= await db.collection('teams').updateOne({'_id':ObjectId(team.tid)},{$set:{'name':team.tname,'description':team.tdesc},$currentDate:{ lastModified: true }});
                  let playerres=0;
                  if(teamres){
                    for(var i=0;i<players.length;i++){
//---------------------update player details---------------------------------------------------------
                        console.log(players[i].pname);
                        playerres= await db.collection('players').updateOne({ '_id': ObjectId(players[i].pid) },{$set: { 'name': players[i].pname, 'description': players[i].pdesc },$currentDate: { lastModified: true }});
                    }
                    if(playerres){ //send response if updated
                        client.close();
                        res.status(200).send("OK");
                        
                    }
                    else{
                        res.status(401).send(err);
                    }
                  } 
                  else{
                      res.status(401).send(err);
                  }
            })();         
        }
        else{
            res.status(402).send('Length exceed');
        }   
    });  
}
//---------------------------------------------------search specific team function----------------------------------------
exports.disPlayer=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    const pName=req.params.name.toLowerCase();
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne');
        (async ()=>{
//----------------------------------------------------searching the value in teams database---------------------------------
                const result = await db.collection('teams').find({name:{  $regex: pName, $options: 'i' } }).toArray();
                if(result.length!=0){
                    let players=[];
                    let teams=[];
                    for(var i=0;i<result.length;i++){
                        //----------------------------------fetching players details from fetched player id's of teams database once found--------------------------------
                        for(var j=1;j<=4;j++){
                            const pid=result[i]['Player'+j]; 
                            if(pid){
                                const result2=await db.collection('players').find({'_id':ObjectId(pid)}).toArray();
                                if(result2){
                                    players.push({pid:result2[0]['_id'],pname:result2[0]['name'],pdesc:result2[0]['description']});
                                }
                            }
                        }
                        //----------------------------------storing teams and players into an array {id:teamname,teamdesc,playerid,playername,playerdesc}
                        teams.push({id:result[i]['_id'],name:result[i]['name'],desc:result[i]['description'],players});
                        players=[];
                    }
                    client.close();
                    return res.status(200).send({teamsArray:teams});
                }
                else{
                    res.status(404).send("not found");
                }
            })();
        }); 
}
//-------------------------------------Adding Community Game Night Schedule Api--------------------------------
exports.addCG=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const title= req.body.title;
        const date = new Date(req.body.date);
        //getting date,month and year.
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        if(title.length < 100){
            const db = client.db('esports_1ne');
            (async ()=>{
                const toBeInserted={'title':title,'date':(dd+'-'+mm+'-'+yyyy)};
                db.collection('game_night').insertOne(toBeInserted,(err, object)=> {
                    if(object){
                        client.close();
                        return res.status(200).send('OK!');            
                    }
                });
            })();
        }
        else{
            res.status(402).send('Length exceed!');
        }
    });
}
//-------------------------------------fetching Community Game Night Schedule Api--------------------------------
exports.displayCG=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
            const db = client.db('esports_1ne');
            (async ()=>{
                const result = await db.collection('game_night').find({}).toArray();
                if(result) {
                    result.forEach((item)=>{
                        delete item._id;
                    })
                    console.log(result);
                    client.close();
                    res.status(200).send({cgnResult:result});
                }else {
                    res.status(400).send('not found!');
                }
            })();
        });
}
//-------------------------------------Adding Events Api----------------------------------------------------
exports.addEvent=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const title=req.body.title;
        const date = new Date(req.body.date);
        //getting date,month,year,hours,minute and second.
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        var hrs = String(date.getHours()).padStart(2, '0');
        var min= String(date.getMinutes()).padStart(2, '0');
        var sec= String(date.getSeconds()).padStart(2, '0');
        if(title.length < 100){
            const db = client.db('esports_1ne');
            (async ()=>{
                const toBeInserted={'title':title,'date':(dd+'-'+mm+'-'+yyyy),'time':(hrs+':'+min+':'+sec)};
                db.collection('events').insertOne(toBeInserted,(err, object)=> {
                    if(object){
                        client.close();
                        return res.status(200).send('OK!');            
                    }
                });
            })();
        }
        else{
            res.status(402).send('Length exceed!');
        }
    });
}
//-------------------------------------Fetching Events Api----------------------------------------------------
exports.displayEvent=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
            const db = client.db('esports_1ne');
            (async ()=>{
                const result = await db.collection('events').find({}).toArray();
                if(result) {
                    result.forEach((item)=>{
                        delete item._id;
                    })
                    console.log(result);
                    client.close();
                    res.status(200).send({eventResult:result});
                }else {
                    res.status(400).send('not found!');
                }
            })();
        });
}