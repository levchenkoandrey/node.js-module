import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

import { ITokensPair } from "../Types/token.types";

class TokenService {
  public generateTokenPair(payload: { _id: Types.ObjectId }): ITokensPair {
    const accessToken = jwt.sign(payload, "jwtAccess", { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, "jwtRefresh", { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
