const express = require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRouter = require('./routes/authenticationroutes');
const bodyParser = require('body-parser');
const corsOptions = {
    origin: [
      "https://localhost:3000",
      "https://127.0.0.1",
    ],
    credentials: true
  }
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended:false}));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use("/auth",authRouter);
  app.listen( 3000 || 5000, "localhost" || '::');