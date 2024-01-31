import { User } from "../../models/user";
import { UserToken } from "../types/responseTypes/UserToken.type";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

export class UserService {
  static async registerUser(
    username: string,
    password: string,
    department_id: number
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      department_id,
    });
    return newUser;
  }

  static async loginUser(
    inputUsername: string,
    inputPassword: string
  ): Promise<UserToken> {
    const user = await User.findOne({
      where: {
        username: inputUsername,
      },
    });
    if (!user) {
      throw new Error("No such user!");
    }
    const isPasswordEqual = await bcrypt.compare(inputPassword, user.password);
    if (!isPasswordEqual) {
      throw new Error("Wrong Password!");
    }
    const token: string = jwt.sign(
      { id: user.id.toString(), username: user.username },
      process.env.JSON_SECRET,
      { expiresIn: "3h" }
    );
    const { password, ...userWithoutPassword } = user.dataValues;
    return { user: userWithoutPassword, token: token };
  }
}
