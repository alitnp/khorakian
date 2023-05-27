import { model, Schema } from "mongoose";
import { IFrontEndRoute } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const frontEndRouteSchemas = new Schema<IFrontEndRoute>({
  title: { type: String, required: true },
  path: { type: String, required: true },
  ...defaultSchemaProps,
});

export const FrontEndRoute = model<IFrontEndRoute>(
  "FrontEndRoute",
  frontEndRouteSchemas,
);
