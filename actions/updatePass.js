import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function userUpdatePass(pass,email){
    const user = prisma.user.findUnique({
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
    try{
        await prisma.user.update({
            where:{
                email
            },
            data:{
                password:pass
            }
        })
        return {
            status:200,
            message:"Password updated"
        }
    }catch(e){
        return {
            status:500,
            message:"Password not updated"
        }
    }
}

export async function adminUpdatePass(pass,email){
    const user = prisma.admin.findUnique({
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
    try{
        await prisma.admin.update({
            where:{
                email
            },
            data:{
                password:pass
            }
        })
        return {
            status:200,
            message:"Password updated"
        }
    }catch(e){
        return {
            status:500,
            message:"Password not updated"
        }
    }
}