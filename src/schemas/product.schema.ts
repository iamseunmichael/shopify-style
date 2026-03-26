import { z } from "zod";

//This protect API from:
// invalid input
// corrupted business data
// malicious request
export const productSchema = z.object({
    name: z.string().min(3),
    sku: z.string().min(3),
    price: z.number().positive(),
    inventory: z.number().int().nonnegative(),
    description: z.string(),
    image: z.string(),
})