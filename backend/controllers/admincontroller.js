const app= require('express');
const {MongoClient}= require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

// get config consts
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

app.use(cookieParser);
app.use(cors());
app.use(bodyParser.json());

exports.addPlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined) res.satus(400).send('Not authed');
        MongoClient.connect(process.env.mongo_url,{ useUnifiedTopology: true }, function (err, client) {
            if (err) throw err
            const name=req.body.name;
            const desc=req.body.desc;
            if(!name.length > 100 && !desc.length > 300 && name!==null && desc!==null){
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
                res.satus(402).send('Length exceed');
            }
        });
}
exports.delPlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined) res.satus(400).send('Not authed');
    MongoClient.connect(process.env.mongo_url,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const id=req.body.id;
        const db = client.db('esports_1ne');
        (async ()=>{
            await  db.collection.findOneAndDelete(
                find({ '_id': id}),
                {
                    
                }
             )
        })();
       
    });
}
exports.updatePlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined) res.satus(400).send('Not authed');
    MongoClient.connect(process.env.mongo_url,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const id=req.body._id;
        const name=req.body.name;
        const desc=req.body.desc;
        if(!name.length > 100 && !desc.length > 300 && name!==null && desc!==null){
            const db = client.db('esports_1ne');
            (async ()=>{
                await db.collection('players').updateOne(
                    { '_id': id },
                    {
                      $set: { 'name': name, 'description': desc },
                      $currentDate: { lastModified: true }
                    }
                  );
            })();      

        }
        else{
            res.satus(402).send('Length exceed');
        }
    });
   
}
exports.displayAll=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined) res.satus(400).send('Not authed');
    const db = client.db('esports_1ne');
    MongoClient.connect(process.env.mongo_url,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        (async ()=>{
            
                const result = await db.collection('players').find({}).toArray();
                res.status(200).send(result);
            });
            client.close();
        })();
}
exports.disPlayer=function(req,res){
    const token = req.cookies.token1;
    if(token===null || token===undefined) res.satus(400).send('Not authed');
    const pName=req.params.name;
    const db = client.db('esports_1ne');
    MongoClient.connect(process.env.mongo_url,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        (async ()=>{
            
                const result = await db.collection('players').find({name: pName}).toArray();
                res.status(200).send(result);
            });
            client.close();
        })();
}