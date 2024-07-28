import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { PrismaSingleton } from "../db/index.js";

const app = express.Router()
app.use(cookieParser())

const prisma = PrismaSingleton.getInstance()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.get('/getAllPending',async (req,res)=>{
    const pending = await prisma.admin.findMany({
        where:{
            verified:false
        }
    })
    return res.status(200).json(pending)
})

app.post('/resolved',async (req,res)=>{
    const id = req.body.id
    const approve = req.body.approve

    const admin = await prisma.admin.findUnique({
        where:{
            id:Number(id)
        }
    })
    if(!admin) return res.status(400).json({message:"Invalid id"})  
    if(approve == "1"){
        await prisma.admin.update({
            where:{
                id:Number(id)
            },
            data:{
                verified:true
            }
        })
        return res.status(200).json({message:"Approved"})
    }
    return res.status(200).json({message:"Rejected"})
})

export default app