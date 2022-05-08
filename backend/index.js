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
      "https://esports-1ne.herokuapp.com",
      "https://1ne-esports.netlify.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1",
      
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
<<<<<<< HEAD
  app.use("/user",userRouter);
  //app.listen(3000, 'localhost');
  app.listen(3000, "localhost");
=======
  app.listen(3000, "localhost");
>>>>>>> 38c8a3a3c9667a406eb03b21f27b2d3495415d1c
