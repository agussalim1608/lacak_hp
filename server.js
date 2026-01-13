const express = require("express");
const app = express();
const fs = require("fs");
const crypto = require("crypto");

app.use(express.json());
app.use(express.static("public"));

const PASSWORD = "agus123"; // ganti dengan password kamu

let data = {};

app.post("/login",(req,res)=>{
 if(req.body.password === PASSWORD) res.send({ok:true});
 else res.send({ok:false});
});

app.post("/generate",(req,res)=>{
 let token = crypto.randomBytes(16).toString("hex");
 data[token] = [];
 res.send({token});
});

app.post("/save/:token",(req,res)=>{
 if(data[req.params.token]){
   data[req.params.token].push(req.body);
 }
 res.send({ok:true});
});

app.get("/location/:token",(req,res)=>{
 res.send(data[req.params.token] || []);
});

app.listen(3000,()=>console.log("Secure Lost Phone Tracker running"));
