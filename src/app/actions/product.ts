"use server"; //ensures code only runs on server

import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";
import { logAudit } from "@/lib/audit-log";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function createProduct(formData: FormData) {
    try{
        const sku = `SKU-${Math.random().toString(36).substring(2,8).toUpperCase()}`;
        const data = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            inventory: Number(formData.get("inventory")),
            description: formData.get("description") || undefined,
            image: formData.get("productURL"),
            sku: sku,
        }

        const validated = productSchema.parse(data)

        const product = await prisma.product.create({
            data: validated
        })

        logAudit("PRODUCT_CREATED", "admin")

        revalidatePath("/dashboard/products")

        return {
            success: true,
            product
        }
    }catch (error){
        return{
            success: false,
            message: "Invalid product data"
        }
    }
}
