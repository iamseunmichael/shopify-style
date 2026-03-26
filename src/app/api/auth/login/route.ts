import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const data = schema.parse(body);

        //find user from database
        const user = await prisma.user.findUnique({
            where: {email: data.email},
        });

        if(!user){
            return NextResponse.json(
                {error: "Invalid User email"},
                {status: 401}
            );
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if(!isValid){
            return NextResponse.json(
                {error: "Invalid User password"},
                {status: 401}
            );
        }

        //sign JWT token
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const res = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });

        //Set token as httpOnly cookie
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, //last for 7 days
        });
        return res;

        
    }catch{
        return NextResponse.json(
            {error: "Login failed"},
            {status: 400}
        );
    }
}