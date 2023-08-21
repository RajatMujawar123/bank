const jwt = require("jsonwebtoken")

const Authenticate=(req,res,next)=>{

    const token = req.headers.authorization
      console.log(token)
     if(token){
        const decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            const userId = decoded.userId
            req.body.user = userId;
            next()
        }
        else{
            res.status(400).send({"msg" : "Please Login First"})
        }  

     }else{
        res.status(400).send({"msg" : "Please Login First"})
     }



  

}
module.exports=Authenticate;