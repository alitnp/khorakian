import { BAD_REQUEST } from "http-status/lib";

export const getMongoDbError = (errorObject: {
  errors: Record<string, { message: string }>;
}) => {
  const errorKeys = Object.keys(errorObject.errors);
  const errorDetail: Record<string, string> = {};
  errorKeys.map(
    (key: string) => (errorDetail[key] = errorObject.errors[key].message),
  );

  return {
    status: BAD_REQUEST,
    body: {
      status: BAD_REQUEST,
      message: Object.values(errorObject.errors)[0].message,
      details: errorDetail,
      isSuccess: false,
      data: null,
    },
  };
};
