import { getAllPending } from "./pending.js";
import { getProfit } from "./profit.js";
import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()

async function getAdmin(adminId){
    const user = await prisma.admin.findUnique({
        where : {
            id : adminId
        }, 
        select : {
            email : true,
            password : false,
            name : true,
            mobile : true
        }
    });

    return user;
}

export default async function (adminId) {
    
    const adminDetail = await getAdmin(adminId);
    let users = await getAllPending()
    if(users.status == 400){
        return {
            status : 200,
            message : {
                pending : 0,
                admin : adminDetail,
                profit : 0
            }
        }
    }
    users = users.message;
    let total = 0;
    users.map((u) => {
        total = total + u.balance    
    })
    const profit = (await getProfit(new Date())).message
    return {
        status : 200,
        message : {
            pending : total,
            admin : adminDetail,
            profit
        }
    }
}