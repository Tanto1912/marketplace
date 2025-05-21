export interface User {
  id: number;
  username: string;
  role: "admin" | "user";
  status: "pending" | "active" | "rejected";
}
