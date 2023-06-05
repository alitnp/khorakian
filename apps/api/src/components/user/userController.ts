//@ts-ignore
import TrezSMSClient from "trez-sms-client";
import { INotificationRead, IUser, IUserRead } from "@my/types";
import { apiDataResponse } from "@/helpers/apiResponse";
import UserData from "@/components/user/userData";
import { NotFoundError } from "@/helpers/error";
import { fileForm } from "@/middlewares/fileForm";
import BadRequestError from "@/helpers/error/BadRequestError";
import BaseController from "@/controller/globalControllers";
import { getUserIdFromReq } from "@/utils/util";

class UserController extends BaseController<IUserRead> {
  data;
  constructor(data: UserData) {
    super(data);
    this.data = data;
  }

  create = async (req: Req, res: Res) => {
    const result = await this.data.register(req.body);
    res.send(apiDataResponse<IUser>(result));
  };

  login = async (req: Req, res: Res) => {
    const data = await this.data.login(
      req.body.mobileNumber,
      req.body.password,
    );
    return res.send(apiDataResponse<{ token: string; user: IUserRead }>(data));
  };

  getCurrentUser = async (req: Req, res: Res) => {
    const userId = getUserIdFromReq(req);
    if (!userId) throw new NotFoundError("کاربر یافت نشد");
    const user = await this.data.getCurrentUser(userId);
    return res.send(apiDataResponse<IUserRead>(user));
  };

  uploadProfile = async (req: Req, res: Res) => {
    const tempReq = req as Req & { file: fileForm };
    console.log(req.file);
    if (!tempReq.file) throw new BadRequestError("فایل عکس یافت نشد.");
    const userId = getUserIdFromReq(req);
    if (!userId) throw new NotFoundError("کاربر یافت نشد");
    const data = await this.data.uploadProfile(
      tempReq.file,
      userId,
      tempReq.body.title,
    );
    return res.send(apiDataResponse(data));
  };

  getMyNotifications = async (req: Req, res: Res) => {
    const userId = getUserIdFromReq(req);
    if (!userId) throw new NotFoundError("کاربر یافت نشد");
    const items = await this.data.getMyNotifications(userId);
    return res.send(apiDataResponse<INotificationRead[]>(items));
  };

  toggleUserAdminAccess = async (req: Req, res: Res): Promise<Res> => {
    const result = await this.data.toggleUserAdminAccess(req.params.id);
    return res.send(apiDataResponse<IUser>(result));
  };

  iForgot = async (_req: Req, res: Res): Promise<Res> => {
    // const user = await this.data.getUserByMobileNumber(req.body.mobileNumber);

    const username = "alihamedani";
    const password = "ABc124528";
    const client = new TrezSMSClient(username, password);

    const sender = "5000248725";
    const receiver = "09308297880";
    const groupId = client.getRandomGroupId();

    client
      .autoSendCode(receiver, "Signiture Footer For Branding")
      .then((messageId: string) => {
        console.log("Sent Message ID: " + messageId);
      })
      .catch((error: any) => console.log(error));

    client
      .sendMessage(sender, receiver, "Hello World!", groupId)
      .then((receipt: any) => {
        console.log("Receipt: " + receipt);
      })
      .catch((error: any) => {
        // If there is an error, we'll catch that
        console.log(error.isHttpException, error.code, error.message);
      });

    return res.send(
      apiDataResponse<null>(null, "کد تایید برای شما ارسال گردید."),
    );
  };

  changePassword = async (req: Req, res: Res) => {
    const result = await this.data.changePassword(
      req.body.currentPassword,
      req.body.newPassword,
      getUserIdFromReq(req),
    );
    return res.send(apiDataResponse(result));
  };
}

export default UserController;
