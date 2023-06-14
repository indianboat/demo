const express = require('express');
const router = require('./router/route');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

require('./db/db');
app.use(router); 

app.use((req, res, next) =>{
  res.header({"Access-Control-Allow-Origin": "*"});
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin:"https://mydemy.vercel.app"
}));


app.listen(port, ()=>{
  console.log(`starting server at http://localhost:${port}`);
});