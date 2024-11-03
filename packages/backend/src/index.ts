import { config } from "dotenv";
import express, { Express } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import authRouter from "./routers/auth.router";
import { apiRoutes } from "./config";
import projectRouter from "./routers/project.router";
import cookieParser from "cookie-parser";
import variables from "./utils/auth/variables";
config();

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.WEB_BASE_URL!],
    exposedHeaders: [variables.authorization],
  })
);
app.use(cookieParser());
app.use(fileUpload());

// remove after we have a frontend
app.set("view engine", "ejs");

app.use(`${apiRoutes.base}${apiRoutes.auth.base}`, authRouter);
app.use(`${apiRoutes.base}${apiRoutes.projects}`, projectRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
