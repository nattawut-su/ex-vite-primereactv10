import type { User } from '../model/User';
let seq = 3;
export const db = {
  users: [
    { id: 1, name: 'Alice Mock', email: 'alice@example.com' },
    { id: 2, name: 'Bob Mock', email: 'bob@example.com' },
  ] as User[],
};
export function nextId() {
  return seq++;
}
