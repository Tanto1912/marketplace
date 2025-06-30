import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { FiPlus, FiX, FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

interface Produk {
  id: number;
  nama: string;
  harga: number;
  keterangan: string;
  gambar: string | null;
}

interface FormProduk {
  nama: string;
  harga: number | "";
  keterangan: string;
  gambar: File | null;
}

export default function ManageProduk() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [form, setForm] = useState<FormProduk>({
    nama: "",
    harga: "",
    keterangan: "",
    gambar: null,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchProduk = async () => {
    try {
      const res = await api.get<Produk[]>("/api/produk");
      setProdukList(res.data);
    } catch {
      alert("Gagal mengambil data produk");
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "gambar" && files) {
      setForm((prev) => ({ ...prev, gambar: files[0] }));
    } else if (name === "harga") {
      setForm((prev) => ({
        ...prev,
        harga: value === "" ? "" : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("harga", form.harga.toString());
      formData.append("keterangan", form.keterangan);
      if (form.gambar) formData.append("gambar", form.gambar);

      if (editId === null) {
        await api.post("/api/produk", formData);
      } else {
        await api.put(`/api/produk/${editId}`, formData);
      }

      setForm({ nama: "", harga: "", keterangan: "", gambar: null });
      setEditId(null);
      setShowForm(false);
      fetchProduk();
    } catch {
      alert("Gagal menyimpan data produk");
    }

    setLoading(false);
  };

  const handleEdit = (produk: Produk) => {
    setForm({
      nama: produk.nama,
      harga: produk.harga,
      keterangan: produk.keterangan,
      gambar: null,
    });
    setEditId(produk.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin hapus produk ini?")) return;

    try {
      await api.delete(`/api/produk/${id}`);
      fetchProduk();
    } catch {
      alert("Gagal hapus produk");
    }
  };

  const openAddForm = () => {
    setForm({ nama: "", harga: "", keterangan: "", gambar: null });
    setEditId(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ nama: "", harga: "", keterangan: "", gambar: null });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-pink-100 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-pink-800 drop-shadow-sm">
        Manage Produk
      </h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 sm:gap-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 sm:py-3 px-5 sm:px-7 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-400"
        >
          <FiPlus size={20} />
          <span className="text-base sm:text-lg">Tambah Produk</span>
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative mx-4">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-pink-700 hover:text-pink-900 font-bold text-2xl p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-700">
              {editId === null ? "Tambah Produk Baru" : "Edit Produk"}
            </h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
              <div>
                <label className="block mb-1 font-semibold text-pink-700">
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                  className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-pink-700">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="harga"
                  value={form.harga}
                  onChange={handleChange}
                  required
                  min={0}
                  className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-pink-700">
                  Keterangan
                </label>
                <textarea
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-pink-700">
                  Gambar Produk
                </label>
                <input
                  type="file"
                  name="gambar"
                  onChange={handleChange}
                  accept="image/*"
                  className="block w-full text-pink-600"
                />
                {editId !== null && (
                  <small className="text-pink-500 block mt-1">
                    Upload gambar baru untuk mengganti gambar lama
                  </small>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  className="px-5 py-2 rounded-full border border-pink-400 text-pink-700 hover:bg-pink-100 transition disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-2 rounded-full shadow-lg transition disabled:opacity-60"
                >
                  {editId === null ? "Tambah Produk" : "Update Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Produk List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produkList.length === 0 && (
          <p className="col-span-full text-center text-pink-600 font-semibold mt-16 text-lg">
            Belum ada produk tersedia
          </p>
        )}

        {produkList.map((produk) => (
          <div
            key={produk.id}
            className="bg-white rounded-xl shadow-md border border-pink-300 hover:shadow-xl transition duration-300 flex flex-col"
          >
            {produk.gambar && (
              <img
                src={`${api.defaults.baseURL}/uploads/${produk.gambar}`}
                alt={produk.nama}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-pink-800 mb-1 break-words">
                {produk.nama}
              </h3>
              <p className="text-pink-700 font-bold text-base mb-2">
                Rp {produk.harga.toLocaleString("id-ID")}
              </p>
              <p className="text-pink-600 text-sm mb-4 whitespace-pre-wrap break-words">
                {produk.keterangan}
              </p>

              <div className="mt-auto flex justify-between">
                <button
                  onClick={() => handleEdit(produk)}
                  className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow transition hover:scale-105"
                >
                  <FiEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(produk.id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition hover:scale-105"
                >
                  <FiTrash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
