import { Comment } from "./comment";
import { User } from "./user";
import { CategoriesEnum, SubCategoryEnum } from "../utils/constants";

type Project = {
  id: number;
  title: string;
  subtitle: string;
  location: String;
  goal: number;
  pledged?: number;
  backers: number;
  categories: CategoriesEnum[];
  subcategories: SubCategoryEnum[];
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  images: string[];
  videos: string[];
  comments: Comment[];
  user: User;
  savedBy: User[];
};

export type { Project };
