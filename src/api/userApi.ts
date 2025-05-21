import axios from "axios";
import type { User } from "../types/User";

const API_URL = "https://api3.app.iklin.online/api/users";

export const getUsers = () => axios.get<User[]>(API_URL);
export const getUserById = (id: number) => axios.get<User>(`${API_URL}/${id}`);
export const createUser = (data: Partial<User> & { password: string }) =>
  axios.post(API_URL, data);
export const updateUser = (id: number, data: Partial<User>) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
export const approveUser = (id: number) =>
  axios.put(`${API_URL}/${id}/approve`);
