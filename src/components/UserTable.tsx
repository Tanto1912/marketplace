import type { User } from "../types/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onApprove: (id: number) => void;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onApprove,
}: Props) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl border border-pink-500 bg-black">
      <table className="min-w-full text-sm text-pink-300">
        <thead>
          <tr className="bg-pink-800 bg-opacity-30">
            <th className="p-3 text-left">👤 Username</th>
            <th className="p-3 text-left">🛡️ Role</th>
            <th className="p-3 text-left">📄 Status</th>
            <th className="p-3 text-center">⚙️ Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-pink-700 hover:bg-pink-900 hover:bg-opacity-20 transition"
            >
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3 capitalize">{user.status}</td>
              <td className="p-3">
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded shadow shadow-purple-500/40 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow shadow-red-500/40 transition duration-200"
                  >
                    Hapus
                  </button>
                  {user.status === "pending" && (
                    <button
                      onClick={() => onApprove(user.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow shadow-green-500/40 transition duration-200"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
