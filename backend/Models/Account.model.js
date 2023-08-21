const mongoose = require("mongoose")

const accountSchema=mongoose.Schema({
         date: { type: Date, default: Date.now },
          time:{ type: String },
         status:{ type: String },
          actionamount:Number ,
          trasectionBy: {type: String,},
          balance:Number ,
          userId : String
  },
   { timestamps: true }
  )

 const AccountModel=mongoose.model("Account",accountSchema);



 module.exports= 
        AccountModel
 ;