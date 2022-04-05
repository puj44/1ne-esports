const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



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



const { MongoClient , ObjectId} = require('mongodb');
//const uri = process.env.mongo_url;
const uri = process.env.mongodb_apikey;
exports.displayAll=function(req,res){
    
    const token = req.cookies.token1;
    
    if(token===null || token===undefined)
    return res.status(403).send(result);
    
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne');
        (async ()=>{
            
                const result = await db.collection('players').find({}).toArray();
                if(result.length>0){
                res.status(200).send(result);
                }
                else
                res.status(400).send("n");
                client.close();
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
            if(!name.length < 100 && !desc.length < 300 && name!==null && desc!==null){
                const db = client.db('esports_1ne');
                (async ()=>{
                    const tobeinserted={'name':req.body.name,'description':req.body.desc};
                    db.collection('players').insertOne(tobeinserted,(err, object)=> {
                        if(object){
                            return res.status(200).send('OK!');            
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
        const id=req.body.id;
        const db = client.db('esports_1ne');
        (async ()=>{
            db.collection('players').findOneAndDelete({ _id:  ObjectId(id)},function(err,object){
                    if(object){
                        return res.status(200).send("OK");
                    }
                    else{
                        return res.status(401).send(err);
                    }
                });
        })();
    });
}
exports.updatePlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined)
    return res.status(403).send(result);
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const id=req.body._id;
        const name=req.body.name;
        const desc=req.body.desc;
        if(!name.length < 100 && !desc.length < 300 && name!==null && desc!==null){
            const db = client.db('esports_1ne');
            (async ()=>{
                 db.collection('players').updateOne({ '_id': ObjectId(id) },{$set: { 'name': name, 'description': desc },$currentDate: { lastModified: true }},function (err, object) {
                    if(object){
                        res.status(200).send("OK");
                    }
                    else{
                        res.status(401).send(err);
                    }
                });
            })();      

        }
        else{
            res.status(402).send('Length exceed');
        }
    });
   
}

exports.disPlayer=function(req,res){
    const token = req.cookies.token1;
     if(token===null || token===undefined)
    return res.status(403).send(result);
    const pName=req.params.name.toLowerCase();
    
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db('esports_1ne');

        (async ()=>{
                
                const result = await db.collection('players').find({name:{  $regex: pName, $options: 'i' } }).toArray();
                if(result){
                    console.log(result);
                    res.status(200).send(result);
                }
                else{
                    const result=[{_id:'',name:'Not found',description:''}]
                    res.status(200).send(result);
                }
                client.close();
            })();
           
        });
}
