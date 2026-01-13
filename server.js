const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DB = "locations.json";

app.post("/save/:token", (req,res)=>{
 let all = {};
 if(fs.existsSync(DB)) all = JSON.parse(fs.readFileSync(DB));

 if(!all[req.params.token]) all[req.params.token]=[];
 all[req.params.token].push(req.body);

 fs.writeFileSync(DB, JSON.stringify(all));
 res.send({ok:true});
});

app.get("/location/:token",(req,res)=>{
 if(!fs.existsSync(DB)) return res.json([]);
 let all = JSON.parse(fs.readFileSync(DB));
 res.json(all[req.params.token] || []);
});

app.listen(process.env.PORT || 3000);
