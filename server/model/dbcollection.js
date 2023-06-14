const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const sch = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  } ,
  tokens:[{
        token: {
            type:String,
            required:true
        }
  }]
});

//Hashing Password
sch.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

// Creating Json Web Token
sch.methods.createToken = async function(){
  try {
    let token = jwt.sign({id:this._id,email:this.email,name:this.name}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
  } catch (error) {
    console.log("Token Generation Failed ", error)
  }
}

// sch.methods.addMsg = async function(message){
//   try {
//     this.messages = this.messages.concat({msg:message});
//     await this.save();
//     return this.messages;
//   } catch (error) {
//     console.log(error);
//   }
// }

//Change Time zone
// sch.plugin(tz, {paths:['date', 'messages.msgSendDate']});

const User = new mongoose.model("user", sch);

module.exports = User;