const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>{
  console.log("DB connection success !");
}).catch((err)=>{
  console.log("Database Connection Error", err);
});
