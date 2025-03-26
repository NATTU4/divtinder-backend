
const jwt = require("jsonwebtoken")
const User = require("../models/user")



    const userAuth = async(req,res,next) =>{
 try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("token not valid!!!!!!!")
    }
      const decodedMessage = await jwt.verify(token,"Snattu@54")
             const {_id} = decodedMessage;
            const user = await User.findOne({_id})
            if(!user){
                throw new Error("user not found")
            }
             req.user = user;
            next();

}catch (err){
    throw new Error("not valid user")
}
}

module.exports = {
    userAuth,
}