const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://rgwqpuvbqdkwcojzvryw.supabase.co",
  "sb_publishable_aiFeq8afElSkXr9PmZ8rOA_XXI9ZMbJ"
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
