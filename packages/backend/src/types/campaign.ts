import { z } from "zod";
import campaignSchema from "../schemas/campaign/campaign.schema";
import { Subcategory, Category } from "@prisma/client";

type Campaign = z.infer<typeof campaignSchema>;

type Query = {
  page: number;
  limit: number;
  category: Category | undefined;
  subcategory: Subcategory | undefined;
  location: string | undefined;
  search: string | undefined;
  id: number | undefined;
};

export type { Campaign, Query };
