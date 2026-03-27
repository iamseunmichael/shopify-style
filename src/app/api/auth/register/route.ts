import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { Role } from "@prisma/client"; // Import the actual Enum type

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  // Updated Zod logic: handle string input and ensure it maps to our Role enum
  role: z.enum(["CUSTOMER", "PRODUCER", "ADMIN"]).default("CUSTOMER"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const email = data.email.toLowerCase();

    // Check if email already exists
    const checkEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (checkEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        // Cast explicitly to Role type to avoid TypeScript/Prisma mismatches
        role: data.role as Role, 
      },
    });

    // Sign JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json(
      { 
        message: "User Created Successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;

  } catch (err) {
    console.error("Registration Error:", err);
    // If Zod validation fails, return the specific error
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input"},
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}