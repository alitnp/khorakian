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
import addTokenDataToHeader from "@/middlewares/addTokenDataToHeader";

export const createApp = (): express.Application => {
  const app = express();

  app.use(cors());
  app.options(
    "*",
    cors({
      preflightContinue: true,
      allowedHeaders: [
        "Content-Type, Authorization, Content-Length, X-Requested-With",
        "x-content-type-options",
      ],
    }),
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.static(CONFIG.APP.STATIC_FILES_PATH));

  if (CONFIG.APP.ENV !== "test") {
    app.use(morgan("dev"));
  }

  app.use(timeout(CONFIG.SERVER.TIMEOUT));

  //Logger
  app.use(logInfoHandler);

  //process token data
  app.use(addTokenDataToHeader);

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
