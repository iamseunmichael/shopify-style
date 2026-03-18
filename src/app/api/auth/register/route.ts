import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {prisma} from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["CUSTOMER", "ADMIN"]).optional(),
});

export async function POST(req: Request) {
    try{ 
        const body = await req.json();
        const data = schema.parse(body);

        const email = data.email.toLowerCase();

        //check if inputed email already exist
        const checkEmail = await prisma.user.findUnique({
            where: {email},
        })

        if(checkEmail) {
            return NextResponse.json(
                { error: "Email already exist" },
                { status: 409 }
            )
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: data.role ?? "CUSTOMER",
            },
        })

        //sign JWT token
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const res = NextResponse.json(
            { message: "User Created Successfully",
                user : {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );

        //Set token as httpOnly cookie
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, //last for 7 days
        });
        return res;

    }catch (err){
        console.log(err);
        return NextResponse.json(
            { err: "Invalid User input" },
            { status: 400 }
        );
    }
}