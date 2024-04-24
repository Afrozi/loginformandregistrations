const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('./db/connect');
const playlistschema = require("./model/model");
const staticpath = path.join(__dirname,"../template/views");
app.set("view engine","hbs");
app.set("views",staticpath);
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
    res.render("sign");
});

app.post("/empdata", async (req,res)=>{
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
        const postdata = new playlistschema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cpassword:req.body.cpassword,
        });
        // const token = await postdata.createtoken();
        // console.log(token);
        const getdata = await postdata.save();
        res.render('login');  
    }else{
        res.send("password are not matching...");
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/logindata", async (req,res)=>{
    const password = req.body.password;
    const email = req.body.email;
    const thapadata = await playlistschema.findOne({email:email});
    // const token = await thapadata.createtoken();
    const realdata = await bcrypt.compare(password,thapadata.password);
    if (realdata) {
         res.render('index');
    }else{
        res.send("passwor are not matching...");
    }
})

app.get("/logout",async (req,res)=>{
    try {
        res.render("login");
    } catch (error) {
        res.status(501).send(error);
    }
});

app.listen(port,()=>{
    console.log('connected');
});