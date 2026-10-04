import jwt from "jsonwebtoken"
import { db } from "../prisma/db.js"

export const authMiddleware = async(req, res, next)=>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    } else if(req.cookies?.jwt){
        token = req.cookies.jwt
    }

    if (!token){
        return res.status(401).json({error: "Not Verified"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user  = await db.orm.public.User.first({id: decoded.id})

        if (!user){
            return res.json({error: "User no longer exists"})
        }

        req.user = user;
        next()
    }catch(err){
        console.error("auth failed:", err.name, "-", err.message);
        return res.status(401).json({error: "Not authorized, token failed" })
    }
}
