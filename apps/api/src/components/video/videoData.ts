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
import { getAllData, IData } from "@/data/globalData";

class VideoData implements IData<IVideo> {
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

    return getAllData<IVideo>(searchQuery, req, this.Video, "thumbnail");
  };

  get = async (id: string) => {
    const video = await this.Video.findById(id);
    if (!video) throw new NotFoundError();
    return video;
  };

  //! fake data : dont use it
  create = async (video: IVideo): Promise<IVideo> => {
    return video;
  };

  createVideoFile = async (
    file: fileForm,
    title?: string,
    imageId?: string,
  ): Promise<IVideo> => {
    //create a temp mongoose object from multer file to generate a valid _id
    const video = new this.Video({
      qualityVariations: [],
    });
    if (title) video.title = title;

    //check if image sent and exists
    if (imageId) {
      const image = await this.Image.get(imageId);
      video.thumbnail = image._id;
    }

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

    await this.Video.findByIdAndDelete(id);

    //delete files from server
    deleteVideoFiles(video);

    return video;
  };
}

export default VideoData;
