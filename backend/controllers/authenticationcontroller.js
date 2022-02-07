const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

// get config consts
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';


// access config const
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


const { MongoClient } = require('mongodb');

exports.authenticate=function(req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "1800");
// res.setHeader("Access-Control-Allow-Headers",'X-Requested-With', 'Authorization', 'Origin', 'Content-Type: application/json', 'Content-Length', 'Accept');
// res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
    console.log("not yet");
    // const uri = "mongodb+srv://1ne-esports:1ne-esports@cluster0.sakf4.mongodb.net/esports_1ne?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // client.connect(err => {
    //     if (err) throw err
    //         const collection = client.db("esports_1ne").collection("admin");
    //         const username=req.body.username;
    //         const password=req.body.password;
            
    //             const user = collection.find({'username':username}).toArray();
    //             if(user){
    //                 bcrypt.compare(password,user['password'],(err,hash_result)=>{
    //                     if(err)
    //                         return res.status(401).send("error");           
    //                     if(hash_result===false){
    //                         return res.status(401).send('Wrong password');
    //                     }
    //                     if( user.length > 0){
    //                         const payload = {'username':username}
    //                         let token = jwt.sign(payload, key,{expiresIn: '72h'});
    //                         res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true,secure:true,sameSite:'none'})
    //                         return res.status(200).send("found");
    //                     }else{
    //                         return res.status(404).send('not found');
    //                     }
    //                 })
    //             }
    //             else{
    //                 return res.status(404).send('not found 1');
    //             }
           
    //         client.close();
    //     });
    const uri = "mongodb+srv://1ne-esports:1ne-esports@cluster0.sakf4.mongodb.net/esports_1ne?retryWrites=true&w=majority";
   
    const client = MongoClient.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true }, function (err) {
        console.log("connected");
        if (err) 
            console.log(err);
        
        const db1 = client.db('esports_1ne');
        const username=req.params.username;
        const password=req.params.password;
        (async ()=>{
            const user =await  db1.collection('admin').find({'username':username}).toArray();
            console.log("username found");
            if(user[0]){
                bcrypt.compare(password,user[0]['password'],(err,hash_result)=>{
                    console.log("username found1");
                    if(err)
                        return res.status(401).send(err);           
                    if(hash_result===false){
                        return res.status(401).send('Wrong password');
                    }
                    if( user.length > 0){
                        console.log("matched");
                        const payload = {'username':username}
                        let token = jwt.sign(payload, key,{expiresIn: '72h'});
                        res.cookie('token', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true,secure:true,sameSite:'none'})
                        return res.status(201).send("logged");
                    }else{
                        return res.status(404).send('not found');
                    }
                })
            }
          else{
              return res.status(404).send('not found 1');
          }
          
        })();
        client.close();
    });
}
exports.signout = function(req, res) {
    res.clearCookie('token',{httpOnly:true, sameSite:'none',secure:true});
}