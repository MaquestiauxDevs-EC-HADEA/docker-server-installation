import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

const usersRouter = Router();

usersRouter.get("/api/user-details", UserController.getUserDetails);

export default usersRouter;
