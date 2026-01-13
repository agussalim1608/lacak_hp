const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://rgwqpuvbqdkwcojzvryw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnd3FwdXZicWRrd2Nvanp2cnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMDY1NjksImV4cCI6MjA4Mzg4MjU2OX0.DZ1HoLP9rN3e5V2MZQMMF8CZaPps-9jSwKyQBycdjR8"
);

app.post("/save/:token", async (req,res)=>{
  const { token } = req.params;
  const { lat, lng, time } = req.body;

  await supabase.from("locations").insert([{ token, lat, lng, time }]);
  res.send({ok:true});
});

app.get("/location/:token", async (req,res)=>{
  const { token } = req.params;
  const { data } = await supabase
     .from("locations")
     .select("*")
     .eq("token", token)
     .order("time", { ascending:false })
     .limit(1);

  res.json(data || []);
});

app.listen(process.env.PORT || 3000);
