const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.static("public"));

app.post("/save-location", (req,res)=>{
  fs.writeFileSync("database.json", JSON.stringify(req.body));
  res.send({status:"saved"});
});

app.get("/location", (req,res)=>{
  if(fs.existsSync("database.json")){
     res.send(fs.readFileSync("database.json"));
  } else {
     res.send({});
  }
});

app.listen(3000, ()=>{
  console.log("Lost Phone Tracker running");
});
