import fs from "fs";
import { Model } from "mongoose";
import { IVideo } from "@my/types";
import { fileForm } from "@/middlewares/fileForm";
import { publicFolder } from "@/config";
import { fileDelete, fileRename } from "@/utils/file";
import { NotFoundError } from "@/helpers/error";
import { getVideoInfo, getVideoHeight, changeVideoSize } from "@/utils/video";
import BadRequestError from "@/helpers/error/BadRequestError";

class VideoData {
  private Video: Model<IVideo, {}, {}, {}, any>;

  constructor(Image: Model<IVideo, {}, {}, {}, any>) {
    this.Video = Image;
  }

  get = async () => {
    const videoPath =
      publicFolder + "/video/" + "VID-6419ecbc066234cd4cab1dd6.mp4";
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoSize);
  };

  createVideoFile = async (file: fileForm): Promise<IVideo> => {
    //create a temp mongoose object from multer file to generate a valid _id
    const video = new this.Video({
      temp: true,
      thumbnailPathname: "",
      qualityVariations: [],
    });

    //pathname and filename variables
    // const videoPath =
    //   publicFolder.path + "\\video\\" + "VID-6419ecbc066234cd4cab1dd6.mp4";
    const videoDir = publicFolder.path + "\\video\\";
    const videoId = video._id;
    const inputFormat = file.mimetype.split("/")[1];
    const newOriginFormatFileName = "IMG-" + videoId + "." + inputFormat;
    //rename temp file created by multer to _id and add original file format
    await fileRename(
      videoDir + file.filename,
      videoDir + newOriginFormatFileName,
    );
    const originVideoPath = videoDir + newOriginFormatFileName;
    const originVideoHeight = await getVideoHeight(originVideoPath);
    if (!originVideoHeight)
      throw new BadRequestError("ویدیو ارسال شده قابل پردازش نمی باشد.");
    console.log(await getVideoInfo(originVideoPath));
    const defaultSizes = [240, 480, 720];

    for (let i = 0; i < defaultSizes.length; i++) {
      const size = defaultSizes[i];
      if (originVideoHeight >= size) {
        const outputFilename = "VID-" + videoId + "-" + size + ".mp4";
        const result = await changeVideoSize(
          originVideoPath,
          size,
          publicFolder.path + "\\video\\" + outputFilename,
        );
        if (result)
          video.qualityVariations.push({
            fileName: outputFilename,
            size,
            pathname: "/video/" + outputFilename,
            format: "mp4",
          });
      }
    }
    await fileDelete(originVideoPath);
    return await video.save();
  };

  videoWasUsed = async (id: string): Promise<IVideo> => {
    const video = await this.Video.findByIdAndUpdate(id, {
      $set: { temp: false },
    });
    if (!video) throw new NotFoundError("ویدیو مورد نظر یافت نشد.");

    return await video.save();
  };
  manyVideoWasUsed = async (idArray: string[]): Promise<IVideo[]> => {
    const updatedVideos: IVideo[] = [];

    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      const video = await this.Video.findByIdAndUpdate(id, {
        $set: { temp: false },
      });
      video && updatedVideos.push(video);
    }

    return updatedVideos;
  };
}

export default VideoData;
