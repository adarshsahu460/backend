import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function userVerify(id,otp) {
    const otpG = await prisma.userOTP.findUnique({
        where:{
            userId:id
        }
    })
    if(otpG && otpG.otp==otp){
        await prisma.userOTP.delete({
            where:{
                id:otpG.id
            }
        })
        if(otpG.createdAt.getTime() < Date.now() - 10*60*1000 ){
            return {
                status:400,
                message:"OTP expired"
            }
        }
        return {
            status:200,
            message:"OTP matched"
        }
    }else{
        return {
            status:400,
            message:"OTP not matched"
        }
    }
}

export async function adminVerify(id,otp) {
    const otpG = await prisma.adminOTP.findUnique({
        where:{
            adminID:id
        }
    })
    if(otpG && otpG.otp==otp){
        await prisma.adminOTP.delete({
            where:{
                id:otpG.id
            }
        })
        if(otpG.createdAt.getTime() < Date.now() - 10*60*1000 ){
            return {
                status:400,
                message:"OTP expired"
            }
        }
        return {
            status:200,
            message:"OTP matched"
        }
    }else{
        return {
            status:400,
            message:"OTP not matched"
        }
    }
}