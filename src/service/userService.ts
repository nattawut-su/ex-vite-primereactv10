import axiosClient from '@lib/api/http';
import type { User } from '../model/User';

async function listUsers(q?: string) {
  const r = await axiosClient.get<User[]>(q ? `/users?q=${encodeURIComponent(q)}` : '/users');
  return r.data;
}
async function getUser(id: number) {
  const r = await axiosClient.get<User>(`/users/${id}`);
  return r.data;
}
async function createUser(input: Pick<User, 'name' | 'email'>) {
  const r = await axiosClient.post<User>('/users', input);
  return r.data;
}
async function updateUser(id: number, input: Pick<User, 'name' | 'email'>) {
  const r = await axiosClient.put<User>(`/users/${id}`, input);
  return r.data;
}
async function patchUser(id: number, input: Partial<Pick<User, 'name' | 'email'>>) {
  const r = await axiosClient.patch<User>(`/users/${id}`, input);
  return r.data;
}
async function deleteUser(id: number) {
  await axiosClient.delete(`/users/${id}`);
  return undefined;
}

export const userService = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
