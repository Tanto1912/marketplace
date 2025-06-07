import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import type { Product } from "../types/product";

const AddEditProduct: React.FC = () => {
  const [form, setForm] = useState<Product>({
    title: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
        });
        setPreview(
          res.data.image_url
            ? `https://api4.app.iklin.online${res.data.image_url}`
            : null
        );
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Produk" : "Tambah Produk"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Judul Produk</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border w-full p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="border w-full p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-40 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Perbarui" : "Tambah"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;
