import { NextFunction, Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import safeFile from "../schemas/campaign/safeFile.schema";
import config from "../config";

const setVideosAndImagesGlobal = (req: Request, file: UploadedFile) => {
  if (file.mimetype.includes("image")) {
    req.images = req.images || [];
    req.images.push(file);
  }

  if (file.mimetype.includes("video")) {
    req.videos = req.videos || [];
    req.videos.push(file);
  }
};

const validateFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as FileArray | null | undefined;

    const uploadedFiles = files?.[config.filesUploadName];

    if (Array.isArray(uploadedFiles)) {
      for (const file of uploadedFiles) {
        if (file.size > config.maxFileSize) {
          res.status(400).json({ message: "File size should not exceed 50MB" });
          return;
        }

        const isValid = await safeFile(file, {
          fileTypes: ["Image", "Video"],
        });

        if (!isValid) {
          res.status(400).json({ message: "Invalid file type" });
          return;
        }

        setVideosAndImagesGlobal(req, file);
      }
    } else {
      if (uploadedFiles) {
        if (uploadedFiles.size > config.maxFileSize) {
          res.status(400).json({ message: "File size should not exceed 50MB" });
          return;
        }

        const isValid = await safeFile(uploadedFiles, {
          fileTypes: ["Image", "Video"],
        });

        if (!isValid) {
          res.status(400).json({ message: "Invalid file type" });
          return;
        }
        setVideosAndImagesGlobal(req, uploadedFiles);
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export default validateFiles;
