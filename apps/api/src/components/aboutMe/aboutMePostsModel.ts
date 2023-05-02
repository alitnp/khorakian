import { model, Schema } from "mongoose";
import { IAboutMe } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const aboutMePostsSchema = new Schema<IAboutMe>({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  name: { type: String, require: true },
  position: { type: String, require: true },

  ...defaultSchemaProps,
});

export const AboutMe = model<IAboutMe>("AboutMePosts", aboutMePostsSchema);
