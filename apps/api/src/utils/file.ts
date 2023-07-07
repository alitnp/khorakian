import fs from "fs";

export const fileRename = async (
  originPathname: string,
  destinationPathname: string
) => {
  const correctOriginPathname = originPathname.replaceAll("/", "\\");
  const correctDestinationPathname = destinationPathname.replaceAll("/", "\\");
  return new Promise((resolve: any, reject: any) => {
    fs.rename(
      correctOriginPathname,
      correctDestinationPathname,
      (error: any) => {
        if (error) {
          console.log(error.message);
          return reject(error.message);
        }
        return resolve();
      }
    );
  });
};

export const fileDelete = async (pathname: string) => {
  const correctPathname = pathname.replaceAll("/", "\\");

  return new Promise((resolve: any, reject: any) => {
    fs.rm(correctPathname, { recursive: true, force: true }, (error: any) => {
      if (error) {
        console.log(error.message);
        reject(error.message);
      }
      resolve();
    });
  });
};
