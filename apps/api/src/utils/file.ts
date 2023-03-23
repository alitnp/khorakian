import fs from "fs";
import ServerError from "@/helpers/error/ServerError";

export const fileRename = async (
  originPathname: string,
  destinationPathname: string,
) => {
  return await fs.rename(originPathname, destinationPathname, (error: any) => {
    if (error) throw new ServerError();
  });
};

export const fileDelete = async (pathname: string) =>
  await fs.unlink(pathname, (error: any) => {
    if (error) throw new ServerError();
  });
