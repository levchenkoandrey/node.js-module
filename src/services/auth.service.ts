import {ApiError} from "../errors";
import {User} from "../models";
import {Token} from "../models/Token.model";
import {IUser} from "../Types";
import {ICredentials, ITokensPair} from "../Types/token.types";
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";
import {emailService} from "./email.service";
import {EEmailActions} from "../enums/email.enam";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });
      await emailService.sendMail(data.email, EEmailActions.WELCOME,{name: data.name});
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokensPair> {
    try {
      user = await User.findOne({ email: credentials.email });

      const isMatcher = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatcher) {
        throw new ApiError("Invalid email or password", 401);
      }
      const tokensPair = await tokenService.generateTokenPair({
        _id: user._id,
        email: user.email,
      });

      await Token.create({ ...tokensPair, _userId: user._id });
      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
