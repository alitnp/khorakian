import { model, Schema } from "mongoose";
import { IDefaultText } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const defaultTextSchemas = new Schema<IDefaultText>({
  text: { type: String, required: true },
  key: { type: String, required: true },
  persianKey: { type: String, required: true },
  ...defaultSchemaProps,
});

export const DefaultText = model<IDefaultText>(
  "DefaultText",
  defaultTextSchemas
);
