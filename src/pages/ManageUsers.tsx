import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from ".././services/api";

interface User {
  id: number;
  username: string;
  role: string;
  approved?: boolean;
}

const ManageUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [form, setForm] = useState({ username: "", role: "user" });
  const [addForm, setAddForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get<User[]>("/api/users");
      setUsers(res.data);
    } catch (error: any) {
      alert(
        "Failed to fetch users: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/api/users/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  const startEdit = (user: User) => {
    setEditUserId(user.id);
    setForm({ username: user.username, role: user.role });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setForm({ username: "", role: "user" });
  };

  const saveEdit = async (id: number) => {
    try {
      await api.put(`/api/users/${id}`, form);
      setEditUserId(null);
      fetchUsers();
    } catch {
      alert("Failed to update user");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    if (!addForm.username.trim() || !addForm.password.trim()) {
      alert("Username and password are required");
      return;
    }
    try {
      await api.post("/api/users", addForm);
      setAddForm({ username: "", password: "", role: "user" });
      setShowAddForm(false);
      fetchUsers();
    } catch {
      alert("Failed to add user");
    }
  };

  const handleApproveUser = async (id: number) => {
    try {
      await api.put(`/api/users/approve/${id}`);
      fetchUsers();
    } catch {
      alert("Failed to approve user");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-gradient-to-b from-pink-50 to-pink-100 rounded-lg shadow-md">
      <h2 className="text-4xl font-extrabold mb-8 text-pink-700 tracking-wide text-center sm:text-left">
        Manage Users
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 w-full sm:w-auto"
          aria-label="Add new user"
        >
          + Add New User
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddUser}
          className="mb-8 p-6 bg-white rounded-lg shadow-inner border border-pink-200 max-w-xl mx-auto"
          aria-label="Add user form"
        >
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">
            Add User
          </h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
            <div className="flex-1">
              <label
                htmlFor="usernameAdd"
                className="block mb-2 font-semibold text-pink-700"
              >
                Username
              </label>
              <input
                id="usernameAdd"
                name="username"
                value={addForm.username}
                onChange={handleAddChange}
                className="border border-pink-300 focus:border-pink-500 rounded-md px-3 py-2 w-full transition duration-200 outline-none focus:ring-2 focus:ring-pink-300"
                required
                autoComplete="off"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="passwordAdd"
                className="block mb-2 font-semibold text-pink-700"
              >
                Password
              </label>
              <input
                id="passwordAdd"
                name="password"
                type="password"
                value={addForm.password}
                onChange={handleAddChange}
                className="border border-pink-300 focus:border-pink-500 rounded-md px-3 py-2 w-full transition duration-200 outline-none focus:ring-2 focus:ring-pink-300"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="roleAdd"
                className="block mb-2 font-semibold text-pink-700"
              >
                Role
              </label>
              <select
                id="roleAdd"
                name="role"
                value={addForm.role}
                onChange={handleAddChange}
                className="border border-pink-300 focus:border-pink-500 rounded-md px-3 py-2 w-full transition duration-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-300"
            >
              Add User
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border border-pink-300 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-pink-700 font-semibold text-sm uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-pink-700 font-semibold text-sm uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-pink-700 font-semibold text-sm uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-pink-100">
            {users.map((user) =>
              editUserId === user.id ? (
                <tr key={user.id} className="bg-pink-50">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="border border-pink-300 focus:border-pink-500 rounded-md px-3 py-2 w-full transition duration-200 outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="border border-pink-300 focus:border-pink-500 rounded-md px-3 py-2 w-full transition duration-200 outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-center flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => saveEdit(user.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow transition duration-300"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.id} className="hover:bg-pink-50 transition">
                  <td className="px-6 py-3 font-medium text-pink-800">
                    {user.username}
                    {user.approved === false && (
                      <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-white bg-pink-500 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 capitalize text-pink-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-3 text-center flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => startEdit(user)}
                      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-3 py-1 rounded-md shadow transition duration-300"
                      aria-label={`Edit user ${user.username}`}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-md shadow transition duration-300"
                      aria-label={`Delete user ${user.username}`}
                    >
                      Delete
                    </button>

                    {user.approved === false && (
                      <button
                        onClick={() => handleApproveUser(user.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-md shadow transition duration-300"
                        aria-label={`Approve user ${user.username}`}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-pink-600 py-6 italic font-semibold"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
