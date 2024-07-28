import { PrismaClient } from "@prisma/client";
import { addProfit } from "./profit.js";
import { PrismaSingleton } from "../db/index.js";


const prisma = PrismaSingleton.getInstance()
export async function payLater(pending){
    const userMob = pending.mobile;
    const items = pending.items;

    const user = await prisma.user.findUnique({
        where:{
            mobile:userMob
        }
    })
    
    if(!user){
        return {
            status:400,
            message:"User not found"
        }
    }
    let profit = 0;
    const userId = user.id;
    items.forEach(async(item) => {
        await prisma.order.create({
            data:{
                userId:Number(userId),
                itemId:Number(item.id),
                quantity:Number(item.qty),
            }
        })
        const menuItem = await prisma.menuItems.findUnique({
            where:{
                id:Number(item.id)
            }
        })
        await prisma.user.update({
            where:{
                id:Number(userId)
            },
            data:{
                balance:{
                    increment:Number(menuItem.price)*Number(item.qty)
                }
            },
        })
        profit += Number(menuItem.price)*Number(item.qty);
    });
    await addProfit(profit, new Date());
    return {
        status:200,
        message:"Order placed successfully"
    }
}


export async function payNow(userId,amt){
    let user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        },
        include:{
            orders:true
        }
    })
    if(!user){
        return {
            status:400,
            message:"User not found"
        }
    }
    user = await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            balance:{
                decrement:amt
            }
        },
        include:{
            orders:true
        }
    })
    if(user.balance==0){
        user.orders.forEach(async(order) => {
            await prisma.order.delete({
                where:{
                    id:Number(order.id)
                }
            })
        })
    }

    return {
        status:200,
        message:"Payment successful"
    }
}