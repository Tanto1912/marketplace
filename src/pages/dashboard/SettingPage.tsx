import { useState } from "react";
import api from "../../services/api";

export default function SettingPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Password baru dan konfirmasi tidak sama");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage("Password berhasil diubah!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-semibold mb-4 text-pink-600">
        Pengaturan Akun
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Password Saat Ini</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password Baru</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {message && (
          <div
            className={`p-2 rounded text-sm ${
              message.includes("berhasil")
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          {loading ? "Menyimpan..." : "Ubah Password"}
        </button>
      </form>
    </div>
  );
}
