const express = require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const authRouter = require('./routes/authenticationroutes');
const adminRouter = require('./routes/adminroutes');
const userRouter = require('./routes/userroutes');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
const corsOptions = {
    origin: [
      "https://esports-1ne.vercel.app",
      "https://1ne-esports.vercel.app",
    ],
    credentials: true,
  }
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended:false}));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use("/auth",authRouter);
  app.use("/admin",adminRouter);
  app.use("/user",userRouter);
  app.listen(process.env.PORT || 5000, process.env.HOST || '::');
