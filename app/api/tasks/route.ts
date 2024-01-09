import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"
import prisma from "@/app/utils/Connect";

export async function POST(req:Request){
    try{
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorised",status:401});
        }
        const {title,description,date,completed,important} = await req.json();
        if(!title || !description || !date){
            return NextResponse.json({
                error:"Missing fields",
                status:400
            });
        }
        if(title.length < 3){
            return NextResponse.json({
                error:"Title Length should be greater than 3",
                status:400
            })
        }


        const task = await prisma.task.create({ 
            data: {
              title,
              description,
              date,
              isCompleted: completed,
              isImportant: important,
              userId,
            },
          });
        return NextResponse.json(task)
    }catch(err){
        console.log("Error Creating Task: ",err);
        return NextResponse.json({error:"Error Creating Task", status:500})
    }
}
export async function GET(req:Request){
    try{
        const {userId} = auth();
        if(!userId){
            return new Response('Not Authenticated', { status: 401 })
        }
        let tasks = await prisma.task.findMany({
            where:{
                userId
            },
        })
        return NextResponse.json(tasks);
    }catch(err){
        console.log("Error Getting Task: ",err);
        return NextResponse.json({error:"Error Creating Task", status:500})
    }
}
export async function PUT(req:Request){
    try{
        const {userId} = auth();
        const {isCompleted,id} = await req.json();
        if(!userId){
            return NextResponse.json({error:"Unauthorized" , status:401});
        }   
        const task = await prisma.task.update({
            where:{
                id,
            },
            data:{
                isCompleted
            }

        })
        return NextResponse.json(task);
    }catch(err){
        console.log("Error Updating Task: ",err);
        return NextResponse.json({error:"Error Creating Task", status:500})
    }
}
