import { useState } from "react";

const EditLandingPage = () => {
  const [title, setTitle] = useState("Selamat Datang di Website Kami");
  const [description, setDescription] = useState(
    "Kami menyediakan produk dan layanan terbaik untuk Anda."
  );
  const [ctaText, setCtaText] = useState("Pelajari Lebih Lanjut");
  const [image, setImage] = useState("/hero.jpg"); // Path gambar header (dummy)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Kirim data ke backend
    console.log({ title, description, ctaText, image });
    alert("Konten landing page berhasil diperbarui!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Edit Konten Landing Page
      </h2>
      <form onSubmit={handleSave} className="space-y-6">
        {/* Judul */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Judul
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={4}
          />
        </div>

        {/* Teks Tombol CTA */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Teks Tombol CTA
          </label>
          <input
            type="text"
            value={ctaText}
            onChange={(e) => setCtaText(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Gambar Header */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Link Gambar Header
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <img
            src={image}
            alt="Header Preview"
            className="w-full mt-4 rounded-md shadow"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-md shadow transition duration-200"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditLandingPage;
