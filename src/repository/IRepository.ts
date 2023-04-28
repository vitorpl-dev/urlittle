import { Url, User } from '@prisma/client';

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRepository {
  findUserByLogin(props: ILoginProps): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;

  findUrlByUri(uri: string): Promise<Url | null>;

  addUrlInUser(
    id: string,
    url: Omit<Url, 'id' | 'createdAt' | 'userId'>
  ): Promise<User | null>;
  removeUrlByUri(id: string, uri: string): Promise<void>;
}
