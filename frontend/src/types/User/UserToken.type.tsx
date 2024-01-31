import { User } from "./user.type";
export type UserToken = {
  user: Partial<User>;
  token: string;
};
