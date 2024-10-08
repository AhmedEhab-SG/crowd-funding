import { Request, Response } from "express";
import campaignSchema from "../schemas/campaign/campaign.schema";
import {
  createCampaignService,
  deleteCampaignService,
  getCampaignService,
  updateCampaignService,
} from "../services/campaign.service";
import { Query } from "../types/campaign";
import { DecodeUser } from "../types/auth";

const getCampaignController = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 9,
      category: req.query.category,
      subcategory: req.query.subcategory,
      location: req.query.location,
      search: req.query.search,
      id: Number(req.query.id),
    } as Query;

    await getCampaignService(res, query);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const createCampaignController = async (req: Request, res: Response) => {
  try {
    if (!req.images?.length && !req.videos?.length) {
      res.status(404).json({ message: "No files uploaded" });
      return;
    }
    if (req.images?.length) req.body = { ...req.body, images: req.images };

    if (req.videos?.length) req.body = { ...req.body, videos: req.videos };

    if (req.userInfo) req.body = { ...req.body, userId: req.userInfo.id };

    const safeCampaign = campaignSchema.safeParse(req.body);

    if (!safeCampaign.success) {
      res.status(403).json({
        error: safeCampaign.error?.format(),
      });
      return;
    }

    await createCampaignService(res, safeCampaign.data);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const updateCampaignController = async (req: Request, res: Response) => {
  try {
    if (req.images?.length) req.body = { ...req.body, images: req.images };

    if (req.videos?.length) req.body = { ...req.body, videos: req.videos };

    const safeCampaign = campaignSchema.partial().safeParse(req.body);

    if (!safeCampaign.success) {
      res.status(403).json({
        error: safeCampaign.error?.format(),
      });
      return;
    }

    await updateCampaignService(
      res,
      +req.params.id,
      req.userInfo as DecodeUser,
      safeCampaign.data
    );
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const deleteCampaignController = async (req: Request, res: Response) => {
  try {
    await deleteCampaignService(
      res,
      +req.params.id,
      req.userInfo as DecodeUser
    );
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export {
  getCampaignController,
  createCampaignController,
  updateCampaignController,
  deleteCampaignController,
};
