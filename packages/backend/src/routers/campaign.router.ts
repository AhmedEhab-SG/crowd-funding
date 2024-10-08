import { Router } from "express";
import {
  createCampaignController,
  deleteCampaignController,
  getCampaignController,
  updateCampaignController,
} from "../controllers/campaign.controller";
import uploadFiles from "../middlewares/uploadFiles.middleware";
import auth from "../middlewares/auth.middleware";

const campaignRouter: Router = Router();

campaignRouter.get("/", getCampaignController);

campaignRouter.post("/", auth, uploadFiles, createCampaignController);

campaignRouter.patch("/:id", auth, uploadFiles, updateCampaignController);

campaignRouter.delete("/:id", auth, deleteCampaignController);

export default campaignRouter;
