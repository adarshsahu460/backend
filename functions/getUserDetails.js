import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export default async function(userId){
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        },
        select:{
            name:true,
            balance:true,
            mobile:true,
            orders:{
                select:{
                    id:true,
                    quantity:true,
                    item:{
                        select:{
                            name:true,
                            price:true
                        }
                    }
                }
            }
        }
    })
    if(!user){
        return {
            status:400,
            message:"User not found"
        }
    }
    return {
        status:200,
        message:user
    }
}   