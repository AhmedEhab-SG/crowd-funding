import { z } from "zod";
import { UploadedFile } from "express-fileupload";
import config from "../../config";
import { Category, Subcategory } from "@prisma/client";

const imageValidator = (files: UploadedFile[] | string[]) => {
  if (!files?.length) return false;

  return files.every((file) => {
    if (typeof file === "string")
      return new RegExp(
        /^https:\/\/.*\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp)$/
      ).test(file);

    if (file.mimetype.includes("image")) {
      const isSizeValid = file.size < config.maxFileSize;
      return isSizeValid;
    }

    return false;
  });
};

const videoValidator = (files: UploadedFile[] | string[]) => {
  if (!files?.length) return false;

  return files.every((file) => {
    if (typeof file === "string")
      return new RegExp(/^https:\/\/.*\.(mp4|webm|ogg|mov|flv|avi|wmv)$/).test(
        file
      );

    if (file.mimetype.includes("video")) {
      const isSizeValid = file.size < config.maxFileSize;
      return isSizeValid;
    }

    return false;
  });
};

const campaignSchema = z.object({
  userId: z.number(),

  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(20, { message: "Title must be less than 20 characters." }),

  subtitle: z
    .string()
    .min(5, { message: "Subtitle must be at least 5 characters." })
    .max(200, { message: "Subtitle must be less than 200 characters." }),

  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters." })
    .max(20, { message: "Location must be less than 20 characters." }),

  goal: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Goal must be a valid number.",
    })
    .transform((value) => Number(value)),

  images: z
    .any()
    .refine(
      (files: UploadedFile[]) =>
        !files || !files?.length || imageValidator(files),
      {
        message:
          "All must be a valid image files or image urls and All files must be less than 5MB.",
      }
    ),

  videos: z
    .any()
    .refine(
      (files: UploadedFile[]) =>
        !files || !files?.length || videoValidator(files),
      {
        message:
          "All must be a valid video files or image urls and All files must be less than 5MB.",
      }
    ),

  category: z.array(
    z.nativeEnum(Category, {
      message:
        "Must be technology, art, music, film, food, fashion, games, design, photography, publishing, comics, theater, dance, journalism, crafts",
    }),
    {
      message: "Must be an array of valid categories",
    }
  ),

  subcategories: z
    .array(
      z.nativeEnum(Subcategory, {
        message:
          "Must be software, hardware, painting, sculpture, classical, rock, documentary, shortFilm, vegan, gourmet, streetwear, hauteCouture, boardGames, videoGames, graphicDesign, interiorDesign, portrait, landscape, fiction, nonFiction, superhero, manga, drama, comedy, ballet, hipHop, investigative, opinion, knitting, woodworking, uncategorized",
      })
    )
    .optional(),
});

export default campaignSchema;
