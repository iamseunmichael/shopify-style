import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function GET (req: NextRequest) {
    try {
        //Authenticate
        const auth = verifyAuth(req);
        if(!auth) {
            return NextResponse.json(
                {message: "Unathorized"},
                {status: 401}
            )
        }
        //Check role for admin
        if(auth.role !== "ADMIN"){
            return NextResponse.json(
                {message: "Forbidden"},
                {status: 403}
            )
        }
        
        //Check role for admin
        if(auth.role == "ADMIN"){
            return NextResponse.json(
                {message: "Authorized"},
                {status: 200}
            )
        }
    }catch(error){
        console.error("Dashboard metrics error: ", error) 

        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}