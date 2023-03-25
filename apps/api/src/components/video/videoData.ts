import fs from "fs";
import { Model } from "mongoose";
import { ApiDataListResponse, IVideo } from "@my/types";
import { fileForm } from "@/middlewares/fileForm";
import { publicFolder } from "@/config";
import { fileDelete, fileRename } from "@/utils/file";
import { ConflictError, NotFoundError } from "@/helpers/error";
import {
  getVideoInfo,
  getVideoHeight,
  changeVideoSize,
  deleteVideoFiles,
} from "@/utils/video";
import BadRequestError from "@/helpers/error/BadRequestError";
import ImageData from "@/components/image/imageData";
import { getAllData } from "@/data/globalData";

class VideoData {
  private Video: Model<IVideo, {}, {}, {}, any>;
  private Image: ImageData;

  constructor(Video: Model<IVideo, {}, {}, {}, any>, Image: ImageData) {
    this.Video = Video;
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IVideo>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IVideo>(searchQuery, req, this.Video);
  };

  get = async () => {
    const videoPath =
      publicFolder + "/video/" + "VID-6419ecbc066234cd4cab1dd6.mp4";
    const videoSize = fs.statSync(videoPath).size;
    console.log(videoSize);
  };

  createVideoFile = async (
    file: fileForm,
    title?: string,
    image?: fileForm,
    imageTitle?: string,
  ): Promise<IVideo> => {
    //if image sended create Image
    let thumbnail;
    if (image) thumbnail = await this.Image.createImageFile(image, imageTitle);

    //create a temp mongoose object from multer file to generate a valid _id
    const video = new this.Video({
      qualityVariations: [],
    });
    if (title) video.title = title;
    if (thumbnail) video.thumbnail = thumbnail._id;

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

  update = async ({ _id, title }: IVideo): Promise<IVideo> => {
    const video = await this.Video.findById(_id);
    if (!video) throw new NotFoundError();

    const existingContentType = await this.Video.findOne({ title });
    if (!!existingContentType) throw new ConflictError();

    video.title = title;

    // await Post.updateMany

    return await video.save();
  };

  remove = async (id: string): Promise<IVideo> => {
    const video = await this.Video.findById(id);
    if (!video) throw new NotFoundError();

    //check if video is temp or not
    // const postsWithThisVideo

    await this.Video.findByIdAndDelete(id);

    //delete files from server
    deleteVideoFiles(video);

    return video;
  };

  updateVideoImage = async (id: string, file: fileForm) => {
    const image = await this.Image.createImageFile(file);
    const video = await this.Video.findOneAndUpdate(
      { _id: id },
      { $set: { thumbnail: image._id } },
    );

    if (!video) throw new NotFoundError("ویدیو مورد نظر یافت نشد");

    return video;
  };
}

export default VideoData;
