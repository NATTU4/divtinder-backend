const express = require("express")

const app = express();



app.get("/user",(req,res)=>{
    res.send("data fetched successfully")
})

app.post("/user",(req,res)=>{
    res.send("data saved to db")
})
app.delete("/user",(req,res)=>{
    res.send("data deleted from the db ")
})


app.use("/user",(req,res)=>{
    res.send("hello hello")
})

app.listen(7777,()=>{
    console.log("server started successfully on port no 7777")

})