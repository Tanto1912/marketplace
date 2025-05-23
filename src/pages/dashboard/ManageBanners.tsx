import { Dialog, Transition } from "@headlessui/react";
import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState, Fragment } from "react";
import api from "../../services/api";

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export default function ManageBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await api.get("/api/banners");
      setBanners(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    resetForm();
    setIsOpen(false);
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImageFile(null);
    setEditId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || (!imageFile && editId === null)) {
      alert("Title, subtitle, dan gambar wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editId === null) {
        await api.post("/api/banners", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.put(`/api/banners/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchBanners();
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan banner");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus banner ini?")) return;

    try {
      await api.delete(`/api/banners/${id}`);
      fetchBanners();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus banner");
    }
  };

  const handleEdit = (banner: Banner) => {
    setTitle(banner.title);
    setSubtitle(banner.subtitle);
    setEditId(banner.id);
    setImageFile(null);
    openModal();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-700">Manage Banners</h1>
        <button
          onClick={openModal}
          className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-700 transition"
        >
          + Add Banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`https://api3.app.iklin.online${banner.imageUrl}`}
              alt={banner.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-pink-800">
                {banner.title}
              </h2>
              <p className="text-gray-600">{banner.subtitle}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(banner)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-2xl font-semibold text-pink-700 mb-4">
                    {editId === null ? "Add New Banner" : "Edit Banner"}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2 border rounded mb-3"
                    />
                    <input
                      type="text"
                      placeholder="Subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full p-2 border rounded mb-3"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                      className="mb-3"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                      >
                        {editId === null ? "Add" : "Update"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
