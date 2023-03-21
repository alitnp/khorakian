import sharp from "sharp";

export const convertImageToWebp = async (
  imagePathname: string,
  outputPathname: string,
) => await sharp(imagePathname).webp().toFile(outputPathname);

export const convertImageToSmallWebp = async (
  imagePathname: string,
  outputPathname: string,
) =>
  await sharp(imagePathname)
    .resize({ width: 300 })
    .webp()
    .toFile(outputPathname);
