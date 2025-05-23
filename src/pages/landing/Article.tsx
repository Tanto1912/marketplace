import React, { useState, useEffect } from "react";
import api from "../../services/api"; // pastikan api sudah set baseURL axios

type Article = {
  id: number;
  title: string;
  summary: string; // bisa generate summary dari content backend, atau langsung backend yg kirim
  content: string;
  date: string;
  imageUrl: string;
};

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch semua artikel
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/articles");
      // Pastikan backend mengirim data dengan key yang sesuai, misal `image` atau `imageUrl`
      // Kalau backend pakai `image` misal, bisa mapping seperti ini:
      const data = res.data.map((article: any) => ({
        id: article.id,
        title: article.title,
        summary: article.summary ?? article.content.substring(0, 100) + "...",
        content: article.content,
        date: article.created_at || article.date,
        imageUrl: article.image
          ? `https://api3.app.iklin.online/uploads/${article.image}`
          : "", // sesuaikan dengan lokasi file backend
      }));
      setArticles(data);
    } catch (err) {
      setError("Gagal memuat artikel. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Kalau mau fetch artikel detail bisa pakai ini juga, tapi karena semua content sudah di fetch di artikel list, cukup pakai data ini saja

  if (loading)
    return <p className="text-center mt-10 text-pink-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-8xl mx-auto px-6 py-12 bg-gradient-to-br from-pink-100 to-pink-200 min-h-screen">
      {!selectedArticle ? (
        <>
          <h1 className="text-4xl font-bold text-pink-700 mb-12 text-center">
            Artikel Terbaru
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(({ id, title, summary, date, imageUrl }) => (
              <article
                key={id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  setSelectedArticle(articles.find((a) => a.id === id) ?? null)
                }
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <time className="text-pink-600 text-sm mb-2 block">
                    {new Date(date).toLocaleDateString()}
                  </time>
                  <h2 className="text-2xl font-semibold text-pink-800 mb-3">
                    {title}
                  </h2>
                  <p className="text-pink-700">{summary}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <button
            className="text-pink-600 hover:text-pink-800 mb-6 font-semibold"
            onClick={() => setSelectedArticle(null)}
          >
            ← Kembali ke daftar artikel
          </button>
          <img
            src={selectedArticle.imageUrl}
            alt={selectedArticle.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <time className="text-pink-600 text-sm mb-4 block">
            {new Date(selectedArticle.date).toLocaleDateString()}
          </time>
          <h1 className="text-3xl font-bold text-pink-800 mb-4">
            {selectedArticle.title}
          </h1>
          <p className="text-pink-700 leading-relaxed whitespace-pre-line">
            {selectedArticle.content}
          </p>
        </article>
      )}
    </div>
  );
};

export default ArticlePage;
