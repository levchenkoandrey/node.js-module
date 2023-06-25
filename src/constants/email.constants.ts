import { EEmailActions } from "../enums/email.enum";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Welcome!!!",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "WE CONTROL YOUR PASSWORD",
  },
};
