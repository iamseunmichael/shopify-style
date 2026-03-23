import Link from "next/link";
import Image from  'next/image';

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string; 
  description?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const image_not_found =
    "https://sharewebdesign.com/wp-content/uploads/2014/12/woocommerce-google-product-feed-1024x536.png";

  const imageSrc = product.image && product.image.trim() !== ""
    ? product.image
    : image_not_found;
  return (
    <Link href={`/market/product/id/${product.id}`}>
      <div className="bg-black rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer h-112.5 flex flex-col overflow-hidden group">
  
        {/* 1. Dedicated Image Container */}
        <div className="relative w-full h-64 overflow-hidden rounded-lg mb-3">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized 
          />
        </div>

        {/* 2. Content Area */}
        <div className="flex flex-col grow">
          <h3 className="font-semibold text-lg text-white">
            {product.name}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 mt-1">
            {product.description}
          </p>

          <div className="mt-auto pt-4">
            <p className="font-bold text-xl text-white">
              ${product.price}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}