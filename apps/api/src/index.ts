// ! Don't convert require into import
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("module-alias").addAlias("@", __dirname);

import mongoose from "mongoose";
import { createApp } from "./app";
import { startServer } from "./server";
import CONFIG, { setAppRoot } from "@/config";

setAppRoot(__dirname);

mongoose.set("strictQuery", false);
mongoose
  .connect(CONFIG.DATABASE.DB_HOST as string)
  .then(() => {
    process.stdout.write("connected to database starting the server");
    if (process.env.NODE_ENV !== "test") {
      const app = createApp();
      startServer(app);
    }
  })
  .catch((err) => process.stdout.write("can not connect to database :", err));
