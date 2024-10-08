import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    export interface Request {
      accessToken?: string;
      videos?: UploadedFile[];
      images?: UploadedFile[];
      userInfo?: {
        id: string;
        email: string;
      };
    }
    export interface Response {}
  }
}
