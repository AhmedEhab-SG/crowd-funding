import { Response } from "express";
import { Project, Query } from "../types/project";
import client from "../db";
import { DecodeUser } from "../types/auth";

const getProjectService = async (res: Response, query: Query) => {
  try {
    const projects = await client.project.findMany({
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

        subcategories: query.subCategory
          ? {
              hasSome: Array.isArray(query.subCategory)
                ? query.subCategory
                : [query.subCategory],
            }
          : undefined,

        location: query.location ? { contains: query.location } : undefined,
      },
    });

    if (!projects.length) {
      res.status(404).json({ message: "No projects found" });
      return;
    }

    const itemCount = await client.project.count();
    const pageCount = Math.ceil(itemCount / query.limit);

    res.status(200).json({
      data: projects,
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

const createProjectService = async (res: Response, project: Project) => {
  try {
    await client.project.create({ data: project });

    res.status(201).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateProjectService = async (
  res: Response,
  projectId: number,
  userInfo: DecodeUser,
  project: Partial<Project>
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

    const targetProject = await client.project.findUnique({
      where: { id: projectId, userId: +id },
    });

    if (!targetProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // check if images and videos are updated and update them
    // targetProject.images.forEach((image) => {});
    // targetProject.videos.forEach((video) => {});

    await client.project.update({
      where: { id: projectId },
      data: { ...project, userId: +id, id: projectId, updatedAt: new Date() },
    });

    res.status(201).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteProjectService = async (
  res: Response,
  projectId: number,
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

    const targetProject = await client.project.findUnique({
      where: { id: projectId, userId: +id },
    });

    if (!targetProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    await client.project.delete({ where: { id: projectId, userId: +id } });

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export {
  getProjectService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
};
