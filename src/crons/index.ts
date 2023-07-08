import { removeOldPasswords } from "./remove-old-password.cron";
import { removeOldToken } from "./remove-old-token.cron";

export const cronRunner = () => {
  removeOldToken.start();
  removeOldPasswords.start();
};
