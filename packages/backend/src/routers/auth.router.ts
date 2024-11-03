import { Router } from "express";
import { apiRoutes } from "../config";
import {
  registerController,
  refreshController,
  loginController,
  revokeRefreshController,
} from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post(apiRoutes.auth.register, registerController);
authRouter.post(apiRoutes.auth.login, loginController);

authRouter.get(apiRoutes.auth.refresh, refreshController);
authRouter.delete(apiRoutes.auth.revokeRefresh, revokeRefreshController);

export default authRouter;
