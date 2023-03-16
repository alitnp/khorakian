//@ts-ignore
import TrezSMSClient from "trez-sms-client";
import { IUser } from "@/components/user/userModel";
import { apiDataResponse } from "@/helpers/apiResponse";
import BaseController from "@/controller/globalControllers";
import UserData from "@/components/user/userData";

class UserController extends BaseController<IUser> {
  data;
  constructor(data: UserData) {
    super(data);
    this.data = data;
  }

  login = async (req: Req, res: Res) => {
    const token = await this.data.login(
      req.body.mobileNumber,
      req.body.password,
    );

    return res.send(apiDataResponse<{ token: string }>({ token }));
  };

  getCurrentUser = async (req: Req, res: Res) => {
    const userId = JSON.parse(req.headers.tokenData as string)._id;
    const user = await this.data.getCurrentUser(userId);

    return res.send(apiDataResponse<IUser>(user));
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
}

export default UserController;
