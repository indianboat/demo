const express = require('express');
const router = require('./router/route');
const app = express();
const port = process.env.PORT || 5000;

require('./db/db');
app.use(router); 

app.use((req, res, next) =>{
  res.setHeader({"Access-Control-Allow-Origin": "*"});
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.listen(port, ()=>{
  console.log(`starting server at http://localhost:${port}`);
});