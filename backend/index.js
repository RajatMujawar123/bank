const express=require("express");
require('dotenv').config()
const cors=require("cors");


const connection=require("./Config/db")
const UserRouter=require("./routes/User.route")
const AccountRouter=require("./routes/Account.route")
const app=express();
app.use(express.json());
app.use(cors({
    origin:"*"
}))



app.use("/account",AccountRouter);
app.use("/user",UserRouter);

app.listen(process.env.port,async()=>{
 try{
 await connection;
 console.log(`server running on port${process.env.port}`)
 }
 catch{
    console.log("error in server connection")
 }
})
