import { Request, Response } from "express";
import { Campaign, Query } from "../types/campaign";
import client from "../db";
import { DecodeUser } from "../types/auth";

const getCampaignService = async (res: Response, query: Query) => {
  try {
    const campaigns = await client.campaign.findMany({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      where: {
        id: query.id ? { equals: query.id } : undefined,

        title: query.search ? { contains: query.search } : undefined,

        categories: query.category
          ? {
              hasSome: Array.isArray(query.category)
                ? query.category
                : [query.category],
            }
          : undefined,

        subcategories: query.subcategory
          ? {
              hasSome: Array.isArray(query.subcategory)
                ? query.subcategory
                : [query.subcategory],
            }
          : undefined,

        location: query.location ? { contains: query.location } : undefined,
      },
    });

    if (!campaigns.length) {
      res.status(404).json({ message: "No campaigns found" });
      return;
    }

    const itemCount = await client.campaign.count();
    const pageCount = Math.ceil(itemCount / query.limit);

    res.status(200).json({
      data: campaigns,
      meta: {
        page: query.page,
        limit: query.limit,
        itemCount,
        pageCount,
        hasPreviousPage: query.page > 1,
        hasNextPage: query.page < pageCount,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const createCampaignService = async (res: Response, campaign: Campaign) => {
  try {
    await client.campaign.create({ data: campaign });

    res.status(201).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateCampaignService = async (
  res: Response,
  campaignId: number,
  userInfo: DecodeUser,
  campaign: Partial<Campaign>
) => {
  try {
    const { id, email } = userInfo;

    const user = await client.user.findUnique({
      where: { id: +id, email },
    });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    const targetCampaign = await client.campaign.findUnique({
      where: { id: campaignId, userId: +id },
    });

    if (!targetCampaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // check if images and videos are updated and update them
    // targetCampaign.images.forEach((image) => {});
    // targetCampaign.videos.forEach((video) => {});

    await client.campaign.update({
      where: { id: campaignId },
      data: { ...campaign, userId: +id, id: campaignId, updatedAt: new Date() },
    });

    res.status(201).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteCampaignService = async (
  res: Response,
  campaignId: number,
  userInfo: DecodeUser
) => {
  try {
    const { id, email } = userInfo;

    const user = await client.user.findUnique({
      where: { id: +id, email },
    });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    const targetCampaign = await client.campaign.findUnique({
      where: { id: campaignId, userId: +id },
    });

    if (!targetCampaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    await client.campaign.delete({ where: { id: campaignId, userId: +id } });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export {
  getCampaignService,
  createCampaignService,
  updateCampaignService,
  deleteCampaignService,
};
