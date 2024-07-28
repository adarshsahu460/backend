import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function getAllPending(){
    const items = await prisma.user.findMany({
        where:{
            balance:{
                gt:0
            }
        }
    })
    if(items.length == 0){
        return {
            status:400,
            message:"No pending users"
        }
    }
    return {
        status:200,
        message:items
    }
}

export async function getPending(str){
    const users = await prisma.user.findMany({
        where:{
            OR:[
                {
                    name:{
                        startsWith:str,
                        mode: "insensitive"
                    },
                },
                {
                    name:{
                        contains:str,
                        mode: "insensitive"
                    }
                }
            ],
            AND:{
                balance:{
                    gt:0
                }
            }
        },select:{
            id:true,
            name:true,
            balance:true
        }
    })
    return users
}