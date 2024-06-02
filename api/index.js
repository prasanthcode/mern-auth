require("dotenv").config();
const userRoutes = require('./routes/user.route');
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use('/api/user',userRoutes);
app.get('/',(req,res)=>{
    res.json({
        message: 'API is working!',
    });
})

app.listen(3000, () => {
  console.log(`server listening on port 3000!`);
});
