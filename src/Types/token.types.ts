import { IUser } from "./user.type";

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, "email" | "password">;
export type ITokenPayload = Pick<IUser, "email" | "_id">;
