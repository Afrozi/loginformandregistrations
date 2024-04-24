const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const playlist = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpassword:{
        type:String,
        require:true,
    },
    // tokens:({
    //      token:{
    //         type:String,
    //         require:true,
    //      }
    // })
});

// playlist.methods.createtoken = async function(){
//      try {
//         const token = await jwt.sign({_id: this._id},
//             "fgjfgfngfhgfjgfjgdf;adqwioednrhfleofw");
//             // console.log(token);
//             this.tokens = this.tokens.concat({token : token});
//             await this.save();
//             return token;
//      } catch (error) {
//         console.log(error);
//      }
// }

playlist.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10);
    // this.cpassword = await bcrypt.hash(this.password,10);
    console.log(this.password);
    next();
    this.cpassword = undefined;
})

const playlistschema =  new mongoose.model("ragupandey",playlist);
module.exports = playlistschema;