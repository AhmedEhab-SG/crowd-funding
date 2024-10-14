import { z } from "zod";
import projectSchema from "../schemas/project/project.schema";
import { SubCategory, Category } from "@prisma/client";

type Project = z.infer<typeof projectSchema>;

type Query = {
  page: number;
  limit: number;
  category: Category | undefined;
  subCategory: SubCategory | undefined;
  location: string | undefined;
  search: string | undefined;
  id: number | undefined;
};

export type { Project, Query };
