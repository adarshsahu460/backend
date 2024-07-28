import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

dotenv.config({
    path: '../.env'
})
import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function isAdminAuthenticated(req,res,next){
    const token = req.cookies['lipton-cookie-admin']
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded.email || !decoded.password){
            return res.status(401).json({message:"Unauthorized"})
        }
        const admin = await prisma.admin.findUnique({
            where:{
                email:decoded.email
            }
        })
        if(!admin){
            return res.status(401).json({message:"Unauthorized"})
        }
        const isMatch = await bcrypt.compare(decoded.password,admin.password)
        if(!isMatch){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.body.adminId = admin.id
        next()
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}


export async function isUserAuthenticated(req,res,next){
    const token = req.cookies['lipton-cookie-user']
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded.email || !decoded.password){
            return res.status(401).json({message:"Unauthorized"})
        }
        const user = await prisma.user.findUnique({
            where:{
                email:decoded.email
            }
        })
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const isMatch = await bcrypt.compare(decoded.password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.body.userId = user.id
        next()
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}
