import { useEffect, useState } from "react";
import type { User } from "../types/User";
import * as api from "../api/userApi";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>(undefined);

  const loadUsers = async () => {
    const res = await api.getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await api.deleteUser(id);
    loadUsers();
  };

  const handleApprove = async (id: number) => {
    await api.approveUser(id);
    loadUsers();
  };

  const handleSubmit = async (data: Partial<User> & { password?: string }) => {
    if (editUser) {
      await api.updateUser(editUser.id, data);
    } else {
      await api.createUser(data as any);
    }
    setModalOpen(false);
    setEditUser(undefined);
    loadUsers();
  };

  return (
    <div className="p-6 bg-black min-h-screen text-pink-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-500 border-b-2 border-pink-500 pb-2">
          👾 Manage Users
        </h1>
        <button
          onClick={() => {
            setEditUser(undefined);
            setModalOpen(true);
          }}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded shadow-md shadow-pink-500/40 transition duration-200"
        >
          + Tambah User
        </button>
      </div>

      <UserTable
        users={users}
        onEdit={(u) => {
          setEditUser(u);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        onApprove={handleApprove}
      />

      <UserFormModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editUser={editUser}
      />
    </div>
  );
}
