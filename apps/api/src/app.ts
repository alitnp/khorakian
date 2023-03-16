import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";
import timeout from "connect-timeout";
import CONFIG from "./config";
import * as errorHandler from "@/middlewares/errorHandler";
import routes from "@/routes";
import { logInfoHandler } from "@/helpers/loggers";
import swaggerOptions from "@/config/swaggerOptions";

export const createApp = (): express.Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.static("public"));

  if (CONFIG.APP.ENV !== "test") {
    app.use(morgan("dev"));
  }

  app.use(timeout(CONFIG.SERVER.TIMEOUT));

  //Logger
  app.use(logInfoHandler);

  // API Routes
  app.use(`/api/${CONFIG.APP.VER}`, routes);

  //swagger
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerOptions), { explorer: true }),
  );

  // Error Middleware
  app.use(errorHandler.genericErrorHandler);

  return app;
};
