import { useEffect, useState } from "react";
import api from "../../services/api";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  image: string | null;
  created_at: string;
}

const ManagePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await api.get("/api/articles");
      setPosts(response.data);
    } catch (error) {
      console.error("Gagal mengambil data postingan:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Reset form
  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
    setPreviewImage(null);
    setCurrentId(null);
    setIsEditing(false);
  };

  // Open modal for add
  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  // Open modal for edit
  const openEditModal = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setPreviewImage(
      post.image ? `http://localhost:5000/uploads/${post.image}` : null
    );
    setCurrentId(post.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      if (isEditing && currentId !== null) {
        await api.put(`/api/articles/${currentId}`, formData);
      } else {
        await api.post("/api/articles", formData);
      }
      fetchPosts();
      setModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Gagal menyimpan postingan:", error);
    }
  };

  // Delete post
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah yakin ingin menghapus postingan ini?")) return;
    try {
      await api.delete(`/api/articles/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Gagal menghapus postingan:", error);
    }
  };

  // Preview image when file selected
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-pink-600 drop-shadow-md">
        Kelola Postingan
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={openAddModal}
          className="px-7 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition-all duration-300 font-semibold"
        >
          + Tambah Postingan Baru
        </button>
      </div>

      {/* List Posting */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-pink-700">
              {post.title}
            </h2>
            <p className="text-pink-400 font-medium mb-3">{post.category}</p>
            <p className="flex-grow text-gray-700 mb-4 line-clamp-4">
              {post.content}
            </p>
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="w-full rounded-lg object-cover max-h-48 mb-4 shadow-md"
              />
            )}
            <small className="text-gray-400 mb-6 block">
              Dibuat pada: {new Date(post.created_at).toLocaleString()}
            </small>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => openEditModal(post)}
                className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 text-white font-semibold transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-2 rounded-lg bg-pink-700 hover:bg-pink-800 text-white font-semibold transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-pink-600">
              {isEditing ? "Edit Postingan" : "Tambah Postingan"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <textarea
                placeholder="Konten"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                required
                rows={5}
              />
              <input
                type="text"
                placeholder="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <div>
                <label className="block mb-2 font-semibold text-pink-600">
                  Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-4 w-56 max-h-40 rounded-lg object-cover border border-pink-300 shadow-md"
                  />
                )}
              </div>

              <div className="flex justify-end gap-6 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="px-6 py-3 rounded-lg border border-pink-300 text-pink-600 font-semibold hover:bg-pink-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
                >
                  {isEditing ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePost;
