import { PrismaSingleton } from "../db/index.js";

const prisma = PrismaSingleton.getInstance()
export async function searchMenuItem(str,adminId) {
    const items = await prisma.menuItems.findMany({
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
            adminId:Number(adminId)
        },select:{
            id:true,
            name:true,
            price:true,
            key : true
        }
    })
    return items
}


export async function addMenuitem(name,price,adminId, key){
    try{
        await prisma.menuItems.create({
            data:{
                name,
                price,
                adminId: Number(adminId),
                key : key
            }
        })
        return {
            status:200,
            message:"Item added successfully"
        }
    }catch(e){
        return {
            status:500,
            message:"Something went wrong"
        }
    }
}

export async function deleteMenuitem(id){
    try{
        await prisma.menuItems.delete({
            where:{
                id
            }
        })
        return {
            status:200,
            message:"Item deleted successfully"
        }
    }catch(e){
        return {
            status:500,
            message:e
        }
    }
}

export async function updateMenuitem(id,name,price,key){
    try{
        await prisma.menuItems.update({
            where:{
                id : Number(id)
            },
            data:{
                name,
                price : Number(price),
                key
            }
        })
        return {
            status:200,
            message:"Item updated successfully"
        }
    }catch(e){
        return {
            status:500,
            message:"Something went wrong"
        }
    }
}
