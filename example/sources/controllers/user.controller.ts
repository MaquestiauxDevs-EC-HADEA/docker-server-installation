import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async getUserDetails(req: Request, res: Response) {
    const response = await UserService.fetchAll(req.query);
    res.status(response.status).json(response);
  }
}
