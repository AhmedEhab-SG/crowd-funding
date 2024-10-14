import { config } from "dotenv";
import express, { Express } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import authRouter from "./routers/auth.router";
import { apiRoutes } from "./config";
import projectRouter from "./routers/project.router";
config();

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

// remove after we have a frontend
app.set("view engine", "ejs");

app.use(`${apiRoutes.base}${apiRoutes.auth.base}`, authRouter);
app.use(`${apiRoutes.base}${apiRoutes.projects}`, projectRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
