import { useState, useEffect } from "react";
import type { User } from "../types/User";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User> & { password?: string }) => void;
  editUser?: User;
}

export default function UserFormModal({
  show,
  onClose,
  onSubmit,
  editUser,
}: Props) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [status, setStatus] = useState<"pending" | "active" | "rejected">(
    "pending"
  );
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.username);
      setRole(editUser.role);
      setStatus(editUser.status);
    } else {
      setUsername("");
      setRole("user");
      setStatus("pending");
      setPassword("");
    }
  }, [editUser]);

  const handleSubmit = () => {
    const data: Partial<User> & { password?: string } = {
      username,
      role,
      status,
    };
    if (!editUser) data.password = password;

    onSubmit(data);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">
          {editUser ? "Edit User" : "Tambah User"}
        </h2>
        <input
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {!editUser && (
          <input
            className="w-full border px-3 py-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        )}
        <select
          className="w-full border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="w-full border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600 hover:underline">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
