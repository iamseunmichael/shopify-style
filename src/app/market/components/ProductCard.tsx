import Link from "next/link";

export default function ProductCard({ product }: any) {
  const image_not_found =
    "https://sharewebdesign.com/wp-content/uploads/2014/12/woocommerce-google-product-feed-1024x536.png";

  const imageSrc = product.image && product.image.trim() !== ""
    ? product.image
    : image_not_found;
  return (
    <Link href={`/market/product/id/${product.id}`}>
      <div className="bg-black rounded-xl shadow hover:shadow-xl transition p-4 cursor-pointer h-100 overflow-hidden">

        <img
            src={imageSrc}
            className="w-full h-60 rounded-xl"
        />

        <div className="mt-3">
          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {product.description}
          </p>

          <p className="font-bold text-xl mt-2">
            ${product.price}
          </p>
        </div>

      </div>
    </Link>
  );
}