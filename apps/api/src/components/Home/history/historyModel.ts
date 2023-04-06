import { IHistory } from "@my/types";
import { Schema, model } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

const historySchema = new Schema<IHistory>({
  title: { type: String, required: true },
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  ...defaultSchemaProps,
});

export const History = model<IHistory>("History", historySchema);
