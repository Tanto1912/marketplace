import React, { useEffect, useState } from "react";
import api from "../api";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products", {
        params: {
          search,
          page,
          limit,
        },
      });
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-pink-400 font-mono bg-black min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-widest">
          DAFTAR PRODUK
        </h1>
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition shadow-md hover:shadow-pink-400"
          onClick={() => navigate("/dashboard/add")}
        >
          + Tambah Produk
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari produk..."
        className="bg-gray-900 border border-pink-500 text-pink-300 placeholder-pink-500 p-2 mb-6 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid Produk */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-pink-500 rounded-lg p-4 shadow-lg bg-gray-900 hover:shadow-pink-500 transition-all duration-300"
          >
            {product.image_url && (
              <img
                src={`https://api4.app.iklin.online${product.image_url}`}
                alt={product.title}
                className="w-full h-40 object-cover rounded border border-pink-300"
              />
            )}
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            <p className="text-sm text-pink-300">{product.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => navigate(`/dashboard/detail/${product.id}`)}
                className="bg-gray-800 border border-pink-400 text-pink-300 text-sm px-3 py-1 rounded hover:bg-pink-800"
              >
                Detail
              </button>
              <button
                onClick={() => navigate(`/dashboard/edit/${product.id}`)}
                className="bg-yellow-500 text-black text-sm px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id!)}
                className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded font-bold ${
              page === i + 1
                ? "bg-pink-500 text-white shadow-md"
                : "bg-gray-800 text-pink-300 hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
