import React, { useEffect, useState } from "react";
import api from "../../services/api"; // sesuaikan path-nya

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["Semua"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<any[]>("/api/api/produk");
        const mappedProducts: Product[] = res.data.map((item) => {
          const productName = item.nama || "Produk tanpa nama";
          const firstWordCategory = productName.split(" ")[0] || "Lainnya";

          return {
            id: item.id,
            name: productName,
            price: item.harga ? Number(item.harga) : 0,
            image: item.gambar
              ? `https://api4.app.iklin.online/uploads/${item.gambar}`
              : "https://via.placeholder.com/300x200?text=No+Image",
            category: firstWordCategory,
          };
        });

        setProducts(mappedProducts);

        // Ambil kategori unik dari produk
        const uniqueCategories = Array.from(
          new Set(mappedProducts.map((p) => p.category))
        );
        setCategories(["Semua", ...uniqueCategories]);
      } catch (err) {
        alert("Gagal mengambil data produk");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const name = product.name ?? "";
    const category = product.category ?? "";

    const matchesCategory =
      selectedCategory === "Semua" || category === selectedCategory;

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-6">
        Produk Kami
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-48 px-4 py-2 border border-pink-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Produk Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-pink-800 mb-2">
                {product.name}
              </h2>
              <p className="text-pink-600 font-bold text-xl mb-3">
                Rp {(product.price ?? 0).toLocaleString("id-ID")}
              </p>

              <span className="inline-block bg-white text-pink-600 text-sm font-medium px-3 py-1 rounded-full border border-pink-300">
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-pink-500 mt-10">
          Produk tidak ditemukan.
        </p>
      )}
    </div>
  );
};

export default ProductPage;
