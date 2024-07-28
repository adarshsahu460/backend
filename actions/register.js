import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export default async function(email,pass,admin,name,mob){
    if(admin){
        try{
            await prisma.admin.create({
                data:{
                    password:pass,
                    name,
                    email,
                    mobile:mob
                }
            })
            return {
                status:200,
                message:"Verification process has started"
            }
        }catch(e){
            return {
                status:400,
                message:"Error creating admin"
            }
        }
    }else{
        try{
            await prisma.user.create({
                data:{
                    password:pass,
                    name,
                    email,
                    mobile:mob
                }
            })
            return {
                status:200,
                message:"User created"
            }
        }catch(e){
            return {
                status:400,
                message:"Error creating user"
            }
        }
    }
}