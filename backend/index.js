const express = require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRouter = require('./routes/authenticationroutes');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
const corsOptions = {
    origin: [
      "https://esports-1ne.herokuapp.com",
      "https://1ne-esports.netlify.app",
      "http://localhost:3000",
      "http://127.0.0.1",
      
    ],
    credentials: true,
    optionSuccessStatus:200
  }

 app.use("/", (req, res) => {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers",'X-Requested-With', 'Authorization', 'Origin', 'Content-Type: application/json', 'Content-Length', 'Accept');
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 });
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended:false}));
 app.use(cors(corsOptions));
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use("/auth",authRouter);
  app.listen(process.env.PORT || 5000, process.env.HOST || '::');