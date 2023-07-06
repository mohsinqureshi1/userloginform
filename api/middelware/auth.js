const jwt=require("jsonwebtoken")
const secretKey="secretKey"


const auth=(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(token){
   token=token.split(" ")[1]
   let user= jwt.verify(token,secretKey)
   req.userId=user.id;
        }
        else{
           res.status(401).json({
               message:"unauthorized user"
           })
        }
        next();
    }
    catch(error){
  console.log(error)
  res.status(401).json({
    message:"unauthorized user"
  })
    }
  }
  
  module.exports = auth;








// const auth=(req,res,next)=>{
//     try{
//         let token=headers.authorization;
//         if(token){
//    token=token.split(" ")[1]
//    let user= jwt.verify(token,secretKey)
//    req.userId=user.id;
//         }
//         else{
//            res.status(401).json({
//                message:"unauthorized user"
//            })
//         }
//         next();
//     }
//     catch(error){
// console.log(error)
// res.status(401).json({
//     message:"unauthorized user"
// })
//     }
// }


