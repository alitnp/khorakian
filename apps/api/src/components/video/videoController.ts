import fs from "fs";
import { IVideo } from "@my/types";
//@ts-ignore
import BadRequestError from "@/helpers/error/BadRequestError";
import { fileForm } from "@/middlewares/fileForm";
import { apiDataResponse } from "@/helpers/apiResponse";
import VideoData from "@/components/video/videoData";
import { publicFolder } from "@/config";
import { NotFoundError } from "@/helpers/error";

class VideoController {
  private data: VideoData;
  constructor(data: VideoData) {
    this.data = data;
  }

  get = async (req: Req, res: Res) => {
    const filename = req.params.filename;
    const videoPath = publicFolder.path + "\\video\\" + filename;
    const videoStat = fs.statSync(videoPath);
    if (!videoStat) throw new NotFoundError("ویدیو مورد نظر یافت نشد.");
    const fileSize = videoStat.size;
    const range = req.headers.range;

    if (range) {
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
      const contentLength = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const header = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, header);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  };

  create = async (req: Req, res: Res) => {
    console.log(req.body);
    const tempReq = req as Req & { file: fileForm };
    if (!tempReq.file) throw new BadRequestError("فایل ویدیو یافت نشد.");
    if (!tempReq.body.title)
      throw new BadRequestError("عنوان ویدیو تعیین نشد.");
    const video = await this.data.createVideoFile(
      tempReq.file,
      tempReq.body.title,
    );
    return res.send(apiDataResponse<IVideo>(video));
  };
}

export default VideoController;
