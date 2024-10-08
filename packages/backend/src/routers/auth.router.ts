import { Router } from "express";
import { apiRoutes } from "../config";
import {
  registerController,
  refreshController,
  loginController,
} from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post(apiRoutes.auth.register, registerController);

authRouter.get(apiRoutes.auth.refresh, refreshController);

authRouter.post(apiRoutes.auth.login, loginController);

export default authRouter;
