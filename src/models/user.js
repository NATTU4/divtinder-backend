const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        minLength: 4,
        maxLength:10
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        unique: true,
        lowercase:true,
        required:true,
        
    },
    password:{
        type: String
    },
    age:{
        type:Number
    },
    gender:{
        type: String
    },
    photoUrl:{
        type: String,
        default:"dude the photo was missing"

    },
    skills:{
    type:[String]
    }
},{timestamps:true})

userSchema.methods.JWT = async function(){
      const user = this;
   const token = await jwt.sign({_id: user._id}, "Snattu@54",{expiresIn: "1d"})

   return token;
}

// userSchema.methods.validatePassword = async function (passwordInputByUser){
//     const user =this;
//     const passwordHash = user.password;
//     const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
//         return isPasswordValid;
// }

module.exports = mongoose.model("User",userSchema);