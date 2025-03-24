const express = require("express")

const app = express();

app.use("/tt",(req,res)=>{
    res.send("iam from first")
})

app.use("/home",(req,res)=>{
    res.send("iam from home")
})
app.use((req,res)=>{
    res.send("iam from server")
})


app.listen(7777,()=>{
    console.log("server started successfully on port no 7777")

})