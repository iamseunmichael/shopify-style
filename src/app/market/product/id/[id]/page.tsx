import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/ui/AddToCart";
import Image from "next/image";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return (
      <div className="text-center py-20 text-white">
        No product found
      </div>
    );
  }

  const image_not_found =
    "https://sharewebdesign.com/wp-content/uploads/2014/12/woocommerce-google-product-feed-1024x536.png";

  const imageSrc =
    product.image && product.image.trim() !== "" ? product.image : image_not_found;

  return (
    <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-12">
      <div>
        <Image
          src={imageSrc}
          alt={product.name}
          width={500} 
          height={500}
          className="object-cover transition-transform duration-500 hover:scale-105 rounded-md"
          unoptimized 
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">{product.name}</h1>

        <p className="text-gray-400 mt-4">{product.description}</p>

        <p className="text-2xl font-bold mt-6 text-white">${product.price}</p>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}