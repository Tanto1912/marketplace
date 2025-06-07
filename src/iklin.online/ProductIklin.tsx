import React, { useEffect, useState } from "react";
import api from "../api";

const baseUrl = "https://api4.app.iklin.online";

interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
}

const ProductIklin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    api
      .get("`${baseUrl}/products/public-products")
      .then((res) => {
        const fetched = Array.isArray(res.data) ? res.data : [];
        setProducts(fetched);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat produk");
        setLoading(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setPage(1); // Reset ke halaman 1 setiap filter/search berubah
  }, [searchTerm, selectedCategory, products]);

  // Pagination logic: hitung produk untuk halaman sekarang
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit
  );

  const totalPages = Math.ceil(filteredProducts.length / limit);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">
        Produk Kami
      </h1>

      {/* Pencarian & Kategori */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {["All", ...Array.from(new Set(products.map((p) => p.category)))].map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  selectedCategory === category
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-pink-600 border-pink-300 hover:bg-pink-100"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid Produk */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {paginatedProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Tidak ada produk ditemukan.
          </div>
        ) : (
          paginatedProducts.map(({ id, title, description, image_url }) => (
            <div
              key={id}
              className="border border-pink-300 rounded-xl shadow hover:shadow-xl transition p-4 bg-white"
            >
              {image_url ? (
                <img
                  src={`${baseUrl}${image_url}`}
                  alt={title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              ) : (
                <div className="bg-pink-100 w-full h-48 flex items-center justify-center rounded mb-4 text-pink-500">
                  No Image
                </div>
              )}
              <h2 className="text-xl font-semibold mb-1 text-pink-600">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded-full font-semibold border transition ${
                  page === pageNum
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-pink-600 border-pink-300 hover:bg-pink-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductIklin;
