const products = [
  {
    id: 1,
    name: "GC Gold Label 1 Mini",
    price: "$739.65",
    image: "/path/to/product1.jpg",
  },
  {
    id: 2,
    name: "Apple-Dental Air Turbine",
    price: "$396.84",
    image: "/path/to/product2.jpg",
  },
  {
    id: 3,
    name: "Woodpecker Scaling Tip",
    price: "$928.41",
    image: "/path/to/product3.jpg",
  },
  {
    id: 4,
    name: "Woodpecker Endo Motor",
    price: "$778.35",
    image: "/path/to/product4.jpg",
  },
];
const Products = () => {
  return (
    <section className="py-16 px-8 bg-white text-center">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-gray-900">
        Our <span className="text-blue-900">Featured</span>{" "}
        <span className="text-blue-500">Products</span>
      </h2>
      <p className="mt-2 text-gray-600">
        Explore our top-rated selections crafted just for you!
      </p>

      {/* Product Grid */}
      <div className="m-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-contain p-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-blue-500 font-bold mt-2">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="mt-8 inline-flex items-center px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition">
        View All
      </button>
    </section>
  );
};

export default Products;
