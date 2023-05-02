var jwt = require('jsonwebtoken');
const authentication=(async(req,res,next)=>{
const token=req.headers.authorization

if(token){
    try{
        jwt.verify(token.split(" ")[1], 'masai', function(err, decoded) {
            
           if(decoded){
            req.body.authorId=decoded.authorId
            next()
           }else{
            res.status(400).json({"msg":err})
           }
          });
    }catch(err){
        res.status(400).send({"msg":"something going wrong"})
    }
}else{
    res.status(400).send({"msg":"Please login first"})
}




})
module.exports={authentication}