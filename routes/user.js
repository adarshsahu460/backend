import express, { response } from 'express'
import {  userLogin } from '../actions/login.js'
import { userForgot } from '../actions/forgot.js'
import {  userUpdatePass } from '../actions/updatePass.js'
import jwt from 'jsonwebtoken'
import { userVerify } from '../actions/verify.js'
import bcrypt from 'bcrypt'
import register from '../actions/register.js'
import { emailSchema, otpSchema, passwordSchema,nameSchema,phoneNumberSchema } from '../functions/validation.js'
import cookieParser from 'cookie-parser'
import { isUserAuthenticated } from '../functions/isAuthenticated.js'
import cors from 'cors'
import getUserDetails from '../functions/getUserDetails.js'
import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
const app = express.Router()
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.get(`/login`, async (req, res) => {
    const auth = req.cookies['lipton-cookie-user']
    if(!auth) return res.status(400).json({message:"Invalid token"})
    var email = "" , password = ""
    jwt.verify(auth, process.env.SECRET_KEY,function(err,decoded){
        if(err || !decoded || !decoded.email || !decoded.password){
            return 
        }
        email = decoded.email
        password = decoded.password
    })
    if(email == "" || password == ""){
        return res.status(400).json({message:"Invalid token"})
    }
    const result = await userLogin(email,password)
    if(!result.id){
        res.status(result.status).json({message:result.message})
        return
    }
    return res.status(result.status).json({message:result.id})
})

app.post(`/login`,async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if(!email ||!password) return res.status(400).json({message:"Please fill all the fields"})
    // zod validation for email and password
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(password)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})

    const response = await userLogin(email,password)
    if(response.status == 400) return res.status(response.status).json({message:response.message});
    
    const token = jwt.sign({email,password},process.env.SECRET_KEY)
    return res.status(response.status).cookie("lipton-cookie-user",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        sameSite:"none",
        secure:true
    }).json({message:response.message})
})

app.post(`/forgot`, async (req, res) => {
    const email = req.body.email
    if(!email) return res.status(400).json({message:"Please provide a email"})
    
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const response = await userForgot(email)
    return res.status(response.status).json({message:response.message})
})

app.post(`/verify`, async (req, res) => {
    const otp = req.body.otp
    const email = req.body.email

    if(!otp ||!email) return res.status(400).json({message:"Please fill all the fields"})

    const {success : otpSuccess} = otpSchema.safeParse(otp)
    if(!otpSuccess) return res.status(400).json({message:"Please provide a valid otp"})
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    const id = user.id
    const response = await userVerify(id,otp)
    return res.status(response.status).json({message:response.message})
})

app.put(`/updatePass`,async (req,res) =>{
    const email = req.body.email
    const pass = req.body.password

    if(!email ||!pass) return res.status(400).json({message:"Please fill all the fields"})

    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await userUpdatePass(hash,email)
    if(response.status==500) res.status(response.status).json({message:response.message})
    else res.status(response.status).cookie("lipton-cookie-user",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        sameSite:"none",
        secure:true
    }).json({message:response.message})
})

app.post(`/register`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    const name = req.body.name
    const mob = req.body.mobile

    if(!email ||!pass ||!name ||!mob) return res.status(400).json({message:"Please fill all the fields"})
    const{success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    const {success : nameSuccess} = nameSchema.safeParse(name)
    if(!nameSuccess) return res.status(400).json({message:"Name must be at least 3 characters and maximum 20 characters"})
    const {success : mobSuccess} = phoneNumberSchema.safeParse(mob)
    if(!mobSuccess) return res.status(400).json({message:"Please provide a valid phone number"})

    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await register(email,hash,false,name,mob)
    if(response.status==400) res.status(response.status).json({message:response.message})
    else res.status(response.status).cookie("lipton-cookie-user",token,{
        maxAge:1000*60*60*24*30,
        httpOnly:true,
        sameSite:"none",
        secure:true
    }).json({message:response.message})
})


app.use(isUserAuthenticated)
app.get('/logout',async (req,res) => {
    res.clearCookie("lipton-cookie-user")
    return res.status(200).json({message:"Logged out successfully"})
})
app.get('/dashboard',async (req,res) => {
    const {userId} = req.body
    const response = await getUserDetails(userId)
    return res.status(response.status).json({message:response.message})
})

export default app