import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
//@ts-ignore
import { path as ffprobePath } from "@ffprobe-installer/ffprobe";
import ffmpeg, { FfprobeData } from "fluent-ffmpeg";
import { IVideo } from "@my/types";
import { publicFolder } from "@/config";
import { fileDelete } from "@/utils/file";

export const changeVideoSize = (
  inputVideoPath: string,
  outputSize: number,
  outputName: string,
  outputFormat = "mp4",
) =>
  new Promise((resolve: any, reject: any) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);
    ffmpeg(inputVideoPath)
      .on("error", function (err) {
        return reject("An error occurred: " + err.message);
      })
      .on("start", function () {
        console.log("start converting to : " + outputSize);
      })
      .on("end", function () {
        console.log("convert successfull : " + outputName);
        return resolve(outputName);
      })
      .size("?x" + outputSize)
      .output(outputName)
      // .output(publicFolder.path + "\\video\\" + "VID-" + outputSize + ".mp4")
      .outputFormat(outputFormat)
      .run();
  });

export const getVideoInfo = (videoPath: string): Promise<FfprobeData> =>
  new Promise((resolve: any, reject: any) => {
    ffmpeg.setFfprobePath(ffprobePath);
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(videoPath).ffprobe((err: any, data: FfprobeData) => {
      if (err) return reject(null);
      return resolve(data);
    });
  });

export const getVideoHeight = async (
  videoPath: string,
): Promise<number | undefined> => {
  const info = await getVideoInfo(videoPath);
  return info.streams[0].height;
};

export const deleteVideoFiles = (video: IVideo) => {
  const videoPaths = video.qualityVariations.map(
    (vid) => `${publicFolder.path}\\video\\VID-${video._id}-${vid.size}.mp4`,
  );
  videoPaths.map((path) => fileDelete(path));
};
