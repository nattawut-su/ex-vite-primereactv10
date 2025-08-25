interface User {
  id: number;
  name: string;
  email: string;
}
export type { User };
export type UserFormValues = Omit<User, 'id'> & { id?: number };
