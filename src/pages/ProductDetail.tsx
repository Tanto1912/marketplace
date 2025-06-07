import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import type { Product } from "../types/product";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) {
    return <p className="text-center py-10">Memuat data produk...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate("/dashboard/products")}
        className="text-blue-600 underline mb-4"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>

      {product.image_url && (
        <img
          src={`https://api4.app.iklin.online${product.image_url}`}
          alt={product.title}
          className="w-full h-64 object-cover rounded"
        />
      )}
    </div>
  );
};

export default ProductDetail;
