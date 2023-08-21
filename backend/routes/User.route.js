const express = require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usermodel = require("../Models/User.model.js")
const Authenticate = require("../Middleware/Authentication.js")
const AccountModel=require("../Models/Account.model.js")

const UserRouter = express.Router()

UserRouter.post("/signup",async(req,res)=>{
     const{name,email,role,password}=req.body;
    try{
        let presentuser=await Usermodel.findOne({email});
        if(presentuser){
           return  res.send("Email Id is already taken")
        }else{
            bcrypt.hash(password, 5, async (err, hash)=> {
                const user=new Usermodel({name,email,password:hash,role,balance:0})
                await user.save();
              return  res.status(200).send({"msg" : "Singup Succefully"})         
            });
        }
    }
    catch(err){
            console.log(err)
                return res.status(400).send({"msg" : "error in signup"} )
    }
})


UserRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const presentuser=await Usermodel.find({email});
    if(presentuser.length===0){
      return  res.status(400).send({"msg" : "wrong email"})
    }
    const hash_password=presentuser[0].password;
    const userId=presentuser[0]._id;
    const {name,role}=presentuser[0];
    try{
        bcrypt.compare(password, hash_password, (err, result)=> {
            if(result){
                const token= jwt.sign({ "userId":userId,"name":name }, 'shhhhh');
                //console.log(token)
                if(token){
                   return res.status(200).send({"msg":"longin successfull",token:token,role:role,userId:userId})
                }else{
                   return res.status(400).send("error in getting token")
                }
            }else{
               return res.status(400).send("password or username is wrong")
            }
        });
    }

    catch(err){
    console.log(err);
   return  res.status(400).send("error in login")

    }
})


UserRouter.use(Authenticate)

UserRouter.get("/getprofile",async(req,res)=>{
    const { user } = req.body;

try {
     let puser = await Usermodel.findById({ _id: user});
     if (puser) {
          res.status(200).send(puser)
     }
}
catch {
     res.status(401).send("error in getting single user")
}
})



UserRouter.patch("/updateprofile",async(req,res)=>{
    const { user,actionamount,balance,time,status } = req.body;

try {
     const trans=new AccountModel({actionamount,balance,status,trasectionBy:user,time})
     await trans.save()

       let  puser = await Usermodel.findByIdAndUpdate({ _id: user}, { $set: { balance}},{ new: true } );
         return  res.status(200).send("udpate profile")
}
catch {
   return  res.status(401).send("error in updating user")
}
})


UserRouter.get("/getalluser",async(req,res)=>{
    const {user}=req.body;
try{
    const puser=await Usermodel.findById({_id:user});
    if(puser.role!=="banker"){
       return res.status(401).send("Unauthorized request")
    }
    else{
        let data=await Usermodel.find({role:"customer"});
       return res.status(200).send(data)

    }
}
catch{
    return res.status(400).send("error in getting accounts")

}
})


UserRouter.get("/getsingleuser/:id",async(req,res)=>{
    const {user}=req.body;
    const Id=req.params.id;
try{
    const puser=await Usermodel.findById({_id:user});
    if(puser.role!=="banker"){
       return res.status(401).send("Unauthorized request")
    }
    else{
        let data=await Usermodel.findById({_id:Id});
       return res.status(200).send(data)

    }
}
catch{
    return res.status(400).send("error in getting single accounts")

}


})
module.exports=UserRouter;













