import { User } from "../../../models/user";

export type UserToken = {
  user: Partial<User>;
  token: string;
};
