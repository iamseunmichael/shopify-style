import ProductGrid from "./components/ProductGrid";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Marketplace</h1>
        <p className="text-gray-300 mt-2">
          Discover amazing products
        </p>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-12 ">
        <ProductGrid />
      </div>

    </div>
  );
}