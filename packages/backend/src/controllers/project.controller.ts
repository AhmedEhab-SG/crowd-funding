import { Request, Response } from "express";
import projectSchema from "../schemas/project/project.schema";
import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  updateProjectService,
} from "../services/project.service";
import { Query } from "../types/project";
import { DecodeUser } from "../types/auth";

const getProjectController = async (req: Request, res: Response) => {
  try {
    const query = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 9,
      category: req.query.category,
      subCategory: req.query.subCategory,
      location: req.query.location,
      search: req.query.search,
      id: Number(req.query.id),
    } as Query;

    await getProjectService(res, query);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const createProjectController = async (req: Request, res: Response) => {
  try {
    if (!req.images?.length && !req.videos?.length) {
      res.status(404).json({ message: "No files uploaded" });
      return;
    }
    if (req.images?.length) req.body = { ...req.body, images: req.images };

    if (req.videos?.length) req.body = { ...req.body, videos: req.videos };

    if (req.userInfo) req.body = { ...req.body, userId: req.userInfo.id };

    const safeProject = projectSchema.safeParse(req.body);

    if (!safeProject.success) {
      res.status(403).json({
        error: safeProject.error?.format(),
      });
      return;
    }

    await createProjectService(res, safeProject.data);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const updateProjectController = async (req: Request, res: Response) => {
  try {
    if (req.images?.length) req.body = { ...req.body, images: req.images };

    if (req.videos?.length) req.body = { ...req.body, videos: req.videos };

    const safeProject = projectSchema.partial().safeParse(req.body);

    if (!safeProject.success) {
      res.status(403).json({
        error: safeProject.error?.format(),
      });
      return;
    }

    await updateProjectService(
      res,
      +req.params.id,
      req.userInfo as DecodeUser,
      safeProject.data
    );
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const deleteProjectController = async (req: Request, res: Response) => {
  try {
    await deleteProjectService(
      res,
      +req.params.id,
      req.userInfo as DecodeUser
    );
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export {
  getProjectController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
};
