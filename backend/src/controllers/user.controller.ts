import { UserService } from "../services/user.service";
import { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password, department_id } = req.body;
    const newUser = await UserService.registerUser(
      username,
      password,
      department_id
    );
    res.status(200).json({ newUser: newUser });
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const userAndToken = await UserService.loginUser(username, password);
    res.status(200).json(userAndToken);
  } catch (e) {
    res.status(500).json(e);
  }
}
