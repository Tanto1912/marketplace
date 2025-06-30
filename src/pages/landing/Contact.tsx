import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email tidak valid";
    if (!formData.message.trim()) newErrors.message = "Pesan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      alert("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-7xl w-full flex flex-col md:flex-row gap-30">
        {/* Form Kontak */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-4xl font-bold text-pink-700 mb-6 text-center md:text-left">
            Kontak Kami
          </h1>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-pink-700 font-semibold mb-2"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-400"
                      : "border-pink-300 focus:ring-pink-400"
                  }`}
                  placeholder="Masukkan nama Anda"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-pink-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400"
                      : "border-pink-300 focus:ring-pink-400"
                  }`}
                  placeholder="Masukkan email Anda"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-pink-700 font-semibold mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-400"
                      : "border-pink-300 focus:ring-pink-400"
                  }`}
                  placeholder="Tulis pesan Anda di sini"
                  disabled={loading}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-md transition disabled:opacity-70"
              >
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          ) : (
            <div className="text-center text-pink-700">
              <h2 className="text-2xl font-semibold mb-4">Terima kasih!</h2>
              <p>
                Pesan Anda telah kami terima dan akan segera kami tindak
                lanjuti.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-md transition"
              >
                Kirim Pesan Lagi
              </button>
            </div>
          )}
        </div>

        {/* Peta Lokasi */}
        <div className="flex-1 max-w-lg rounded-xl overflow-hidden shadow-lg ">
          <iframe
            title="Lokasi Kami"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.859803498209!2d110.3777871147761!3d-7.797068474383098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57814b0d9d2d%3A0xb6d93c785d124a4a!2sMonumen%20Jogja%20Kembali!5e0!3m2!1sid!2sid!4v1683103651891!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ minHeight: "400px", border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
