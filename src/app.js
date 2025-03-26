const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieparser = require("cookie-parser")
const {userAuth} = require("./middleware/auth")
app.use(express.json())
app.use(cookieparser())

app.post("/singup",async(req,res) => {
    

    try{
        validateSignUpData(req);

    const {firstName,lastName,emailId,password}=req.body;
      const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword
    })
   
       await user.save()
       res.send("user added successfully!!")
    }catch (err){
        res.status(400).send("Error:" + err.message)
    }
  
})

app.post("/login",async(req,res) =>{
    try{
        const {emailId,password}= req.body;
        const user = await User.findOne({emailId:emailId})
      
        if(!user){
           throw new Error("email not valid")
        }
   
        const ispasswordValid = await bcrypt.compare(password,user.password);
        
        if(ispasswordValid){
             
              const token =  await user.JWT();

            res.cookie("token",token)
         res.send("login successfull")
        }else{
           throw new Error("password not valid")
        }
    }catch (err){
        res.status(400).send("Error:" + err.message);
    }
   
})

app.post("/profile",userAuth,async (req,res) =>{
     try{
        const user = req.user;
        res.send(user);
        if(!user){
            throw new Error("user doesn't exit")
        }


     }catch(err){
              res.status(400).send("Error:"+err.message)
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

