import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function getProfit(date){
    date.setHours(0,0,0,0)
    let profit = await prisma.profit.findUnique({
        where:{
            date
        }
    })
    if(!profit){
        profit = await prisma.profit.create({
            data:{
                profit:0,
                date
            }
        })
    }
    return {
        status:200,
        message:profit.profit
    }
}   

export async function addProfit(profit,date){
    date.setHours(0,0,0,0)
    await prisma.profit.upsert({
        where:{
            date
        },
        update:{
            profit:{
                increment:profit
            }
        },
        create:{
            profit,
            date
        }
    })
    return {
        status:200,
        message:"Profit added"
    }
}