import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthPayload {
    userId: string
    role: "ADMIN" | "CUSTOMER"
}

export function verifyAuth(req: NextRequest): AuthPayload | null {
    const token = req.cookies.get("token")?.value

    if(!token) return null

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthPayload

        return decoded
    } catch {
        return null
    }
}