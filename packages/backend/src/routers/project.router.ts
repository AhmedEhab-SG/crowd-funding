import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  updateProjectController,
} from "../controllers/project.controller";
import uploadFiles from "../middlewares/uploadFiles.middleware";
import auth from "../middlewares/auth.middleware";

const projectRouter: Router = Router();

projectRouter.get("/", getProjectController);

projectRouter.post("/", auth, uploadFiles, createProjectController);

projectRouter.patch("/:id", auth, uploadFiles, updateProjectController);

projectRouter.delete("/:id", auth, deleteProjectController);

export default projectRouter;
