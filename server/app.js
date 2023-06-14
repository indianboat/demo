const express = require('express');
const router = require('./router/route'); // require router
const app = express();
const port = process.env.PORT || 5000;
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const cors = require('cors');

require('./db/db');

app.use(router); // using router

// app.use(cors({ origin: "*" }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(port, ()=>{
  console.log(`starting server at http://localhost:${port}`);
});