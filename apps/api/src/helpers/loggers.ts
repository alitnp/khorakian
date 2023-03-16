import fs from "fs";
import httpStatus from "http-status/lib";
import expressPino from "express-pino-logger";
import { hidePassword } from "@/utils/auth";
import CONFIG from "@/config";

const { OK, BAD_REQUEST, SERVER_ERROR } = httpStatus;

// More info: https://github.com/pinojs/express-pino-logger
export const expressPinoLogger = () =>
  expressPino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: true,
      },
    },
    customLogLevel(res, err) {
      const status = res.statusCode;
      if (status >= 200 && status < 300) {
        return "info";
      }
      if (status >= 400 && status < 500) {
        return "warn";
      }
      if (status >= 500 || err) {
        return "error";
      }
      return "silent";
    },
    customErrorMessage: (err) => `${err.name} : ${err.message}`,
    customSuccessMessage(res) {
      const status = res.statusCode;
      if (status >= 400 && status < 500) {
        return `${status || BAD_REQUEST} : ${httpStatus[status || 400]}`;
      }
      if (status >= 500) {
        return `${status || SERVER_ERROR} : ${httpStatus[status || 500]}`;
      }
      return `${OK} : ${httpStatus[200].toUpperCase()}`;
    },
    serializers: {
      req: (req) => {
        // console.log('[ R E Q U E S T ] => ', req.raw);
        const {
          method,
          url,
          headers: { host },
        } = req;
        return {
          origin: host,
          method,
          url,
          query: req.query,
          params: req.params,
          body: hidePassword({ ...req.raw.body }),
        };
      },
      res: (res) => {
        // console.log("[ R E S P O N S E ] => ", res);
        return {
          status: res.statusCode,
        };
      },
      err: (err) => `${err.type} : ${err.message}`,
    },
  });

export const exitLog = (err: any, evt: string) => {
  if (err) {
    process.stdout.write(`\n\n[!ERROR][${evt}] => ${err}\n\n`);
  } else {
    process.stdout.write(`\n\n![${evt}] EVENT CAUSE EXIT\n\n`);
  }

  process.exit(err ? 1 : 0);
};

const getIpFromRequest = (req: Req): string => {
  let ip;
  if (req.headers["x-forwarded-for"]) {
    ip = (req.headers["x-forwarded-for"] as string).split(",")[0];
  } else if (req.socket && req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  } else {
    ip = req.ip;
  }
  return ip;
};

export const logErrorHandler = async (
  req: Req,
  resBody: Record<string, any>,
) => {
  if (CONFIG.APP.ENV === "test") return;

  const folderPath = "src/logs";
  const filePath = `src/logs/${CONFIG.APP.ENV}.error.log`;
  const content =
    "{\n" +
    "type : ERROR,\n" +
    "timestamp : " +
    Date.now() +
    ",\n" +
    "date : " +
    new Date() +
    ",\n" +
    "ip : " +
    getIpFromRequest(req) +
    ",\n" +
    "Request : {\n" +
    "method : " +
    req.method +
    ",\n" +
    "url : " +
    req.originalUrl +
    ",\n" +
    "body : " +
    JSON.stringify(req.body) +
    "\n},\n" +
    "Response : " +
    JSON.stringify(resBody) +
    "\n},\n";

  const exists = await fs.existsSync(filePath);

  if (!exists) {
    await fs.mkdirSync(folderPath, { recursive: true });
    await fs.writeFileSync(filePath, content);
  } else {
    fs.appendFile(
      filePath,
      content,
      (err) => err && console.log(JSON.stringify(err)),
    );
  }
};

export const logInfoHandler = async (req: Req, _res: Res, next: NextFn) => {
  // if (err) return next();
  if (CONFIG.APP.ENV === "test") return next();

  const folderPath = "src/logs";
  const filePath = `src/logs/${CONFIG.APP.ENV}.info.log`;
  const content =
    "{\n" +
    "type : INFO,\n" +
    "timestamp : " +
    Date.now() +
    ",\n" +
    "date : " +
    new Date() +
    ",\n" +
    "ip : " +
    getIpFromRequest(req) +
    ",\n" +
    "Request : {\n" +
    "method : " +
    req?.method +
    ",\n" +
    "url : " +
    req?.originalUrl +
    ",\n" +
    "body : " +
    JSON.stringify(req?.body) +
    "\n},\n";

  const exists = await fs.existsSync(filePath);

  if (!exists) {
    await fs.mkdirSync(folderPath, { recursive: true });
    await fs.writeFileSync(filePath, content);
  } else {
    fs.appendFile(
      `src/logs/${CONFIG.APP.ENV}.info.log`,
      content,
      (err) => err && console.log(JSON.stringify(err)),
    );
  }

  next();
};
