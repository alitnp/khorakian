import pkg from "../../package.json";

export const appRoot = { path: "" };
export const publicFolder = { path: "" };
export const setAppRoot = (path: string) => {
  appRoot.path = path;
  const appRootArr = path.split("/");
  appRootArr.pop();
  publicFolder.path = appRootArr.join("/") + "/public";
};

const CONFIG = {
  APP: {
    NAME: pkg.name,
    VERSION: pkg.version,
    VER: `v${pkg.version[0]}`,
    DESCRIPTION: pkg.description,
    AUTHORS: pkg.users,
    HOST: "127.0.0.1",
    BASE_URL: process.env.API_BASE_URL,
    PORT: 4000,
    ENV: "production",
    STATIC_FILES_PATH: "public",
    APPROOT: "",
  },
  DATABASE: {
    DB_HOST: "mongodb://127.0.0.1:27017/Khorakian",
  },
  SERVER: {
    TIMEOUT: 180000, // 3m
  },
  LOG: {
    PATH: "logs",
    LEVEL: "info",
    MAX_FILES: 5,
  },
  AUTH: {
    SALT_ROUNDS: "11",
    ACCESS_TOKEN_EXPIRE: 2629746, //a month
    REFRESH_TOKEN_EXPIRE: "86400000",
    ACCESS_TOKEN_SALT: "<SALT_FOR_ACCESS_TOKEN>",
    REFRESH_TOKEN_SALT: "<SALT_FOR_REFRESH_TOKEN>",
  },
  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    REGION: process.env.AWS_REGION,
    S3: {
      PATH: process.env.S3_BUCKET_PATH,
      BUCKET_NAME: process.env.S3_BUCKET_NAME,
    },
    COGNITO: {
      USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
      CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    },
  },
  EXTERNAL: {
    API_KEY: process.env.API_KEY,
  },
} as const;

export default CONFIG;
