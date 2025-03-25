const express = require("express")

const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
app.use(express.json())

app.post("/singup",(req,res) => {
    


    const user = new User(req.body)
    try{
        user.save()
       res.send("user added successfully!!")
    }catch (err){
        res.status(400).send("Error saving to the user:"+err.message)
    }
  
})

app.get("/user", async(req,res) =>{
    const userEmail = req.body.emailId;
    try{
      const user = await User.findOne({emailId:userEmail})
         res.send(user)
    }catch (err){
      res.status(400).send("smtg went wrong")
    }
})
app.get("/feed", async(req,res) =>{
    try{
      const user = await User.find({})
         res.send(user)
    }catch (err){
      res.status(400).send("smtg went wrong")
    }
})

app.delete("/delete", async(req,res) =>{
    const userId = req.body.userId;
    try{
      const user = await User.findByIdAndDelete(userId)
      res.send("user deleted successfully")
    }catch (err){
      res.status(400).send("smtg went wrong")
    }
})

app.patch("/update", async(req,res) =>{
    const userId = req.body.userId;

    try{
      await User.findByIdAndUpdate(userId,{lastName:"ching chong chuui"})
      res.send("user updated successfully")
    }catch (err){
      res.status(400).send("smtg went wrong")
    }
})
connectDB()
   .then(()=>{
    console.log("database connected successfully");
    app.listen(7777,()=>{
        console.log("server started successfully on port no 7777")
    
    })
}).catch((err) =>{
    console.error("database cann't connected")
})

