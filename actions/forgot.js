import { PrismaClient } from "@prisma/client";
import emailGenerator from "../functions/email-generator.js";
import otpGenerator from "../functions/otp-generator.js";
import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function userForgot(email){
    const otp = await otpGenerator()
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return {
            status:500,
            message:"User not found"
        }
    }
    await prisma.userOTP.create({
        data:{
            otp,
            userId:user.id
        }
    })
    const response = await emailGenerator(email,otp);
    if(response){
        return {
            status:200,
            message:"OTP sent to your email"
        }
    }else{
        return {
            status:500,
            message:"OTP not sent"
        }
    }
}


export async function adminForgot(email){
    const otp = await otpGenerator()
    const user = await prisma.admin.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return {
            status:500,
            message:"Admin not found"
        }
    }
    await prisma.adminOTP.create({
        data:{
            otp,
            adminID:user.id
        }
    })
    const response = await emailGenerator(email,otp);
    if(response){
        return {
            status:200,
            message:"OTP sent to your email"
        }
    }else{
        return {
            status:500,
            message:"OTP not sent"
        }
    }
}