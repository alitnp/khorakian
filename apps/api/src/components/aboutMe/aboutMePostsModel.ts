import { model, Schema } from "mongoose";
import { IAboutMe } from "@my/types";
import { defaultSchemaProps } from "@/utils/constants";

export const aboutMePostsSchema = new Schema<IAboutMe>({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  ...defaultSchemaProps,
});

export const AboutMe = model<IAboutMe>("AboutMePosts", aboutMePostsSchema);
