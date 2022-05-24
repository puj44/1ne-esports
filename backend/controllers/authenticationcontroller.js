const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

//access config const
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
//----------------------------------Admin Authentication Api------------------------------------------------ 
exports.authenticate=function(req, res) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        const db = client.db("esports_1ne");
        const username=req.body.username.trim();
        const password=req.body.password.trim();
        (async ()=>{
            const user =await  db.collection("admin").find({'username':username}).toArray();
            if(user[0]){
                bcrypt.compare(password,user[0]['password'],(err,hash_result)=>{
                    if(err)
                        return res.status(401).send(err);           
                    if(hash_result===false){
                        return res.status(401).send('Wrong password');
                    }
                    if( user.length > 0){
                        let token = jwt.sign({type:'admin'}, key,{expiresIn: '72h'});
                        res.cookie('token1', token, {expires: new Date(Date.now() + 72 * 3600000),httpOnly:true,secure:true,sameSite:'none'});
                        console.log("logged");
                        return res.status(200).send("logged");
                    }else{
                        return res.status(402).send('not found');
                    }
                })
            }
          else{
              return res.status(404).send('not found 1');
          }
          client.close();
        })();
        
    });
}
//----------------------------------Status Checking Api whether Admin or User------------------------------------------------ 
exports.checkstatus=function(req, res) {
    const token = req.cookies.token1;
    jwt.verify(token, key, (error,result)=>{ 
        if(error){
            return res.status(500).send(result);
        }
        else{
                return res.status(200).send({
                    title:'admin'
                });
            }
    });
}
exports.signout = function(req, res) {
    res.clearCookie('token1',{httpOnly:true, sameSite:'none',secure:true});
    return res.status(200).send("ok");
}