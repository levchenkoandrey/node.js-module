import { removeOldToken } from "./remove-old-token.cron";


export const cronRunner = () => {
  removeOldToken.start();
};
