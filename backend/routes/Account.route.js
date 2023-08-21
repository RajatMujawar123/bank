const express=require("express")
const AccountModel = require("../Models/Account.model.js")
const Authenticate=require("../Middleware/Authentication")

const AccountRouter=express.Router();


AccountRouter.get("/gettransection/:id",async(req,res)=>{
     const Id=req.params.id     
               try{
                    const trans=await  AccountModel.find({trasectionBy:Id})
                    return  res.status(200).send(trans)
               }
               catch{
                   return res.status(400).send("error in getting transection")
               }
          })
          


     
AccountRouter.use(Authenticate)

AccountRouter.post("/transection",async(req,res)=>{
const {actionamount,status,user,time}=req.body;
     try{
          const trans=new AccountModel({actionamount,status,trasectionBy:user,time})
          await trans.save();
          return  res.status(200).send("trasection added Successfully")
     }
     catch(err){
          console.log(err)
          res.status(400).send({ "msg" : err.message})

     }
})



module.exports=AccountRouter;