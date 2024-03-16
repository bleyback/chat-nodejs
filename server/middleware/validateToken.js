import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../schemas/config.js";

export const valideteToken = (req,res,next)=>{
    const {token}=req.cookies;
    if(!token) return res.status(401).json({message:"No token"})
    
    jwt.verify(token, TOKEN_SECRET,(error,user)=>{
        if(error) return res.status(401).json({message:"invalid token"})
        req.user=user
        next()
    })
}