import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../Types";
import { s3Service } from "./s3.service";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async create(data: IUser): Promise<IUser | any> {
    return await User.create(data);
  }

  public async getById(userId: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(userId);
  }
  public async update(userId: string, value: Partial<IUser>): Promise<IUser> {
    await this.getOneByIdOrThrow(userId);

    return await User.findOneAndUpdate(
      { _id: userId },
      { ...value },
      { returnDocument: "after" }
    );
  }
  public async delete(userId: string): Promise<void> {
    await this.getOneByIdOrThrow(userId);

    await User.deleteOne({ _id: userId });
  }
  public async uploadAvatar(
    userId: string,
    avatar: UploadedFile
  ): Promise<IUser> {
    const user = await this.getOneByIdOrThrow(userId);
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    const pathToFile = await s3Service.uploadFile(avatar, "user", userId);
    return await User.findByIdAndUpdate(
      userId,
      { $set: { avatar: pathToFile } },
      { new: true }
    );
  }
  public async deleteAvatar(userId: string): Promise<IUser> {
    const user = await this.getOneByIdOrThrow(userId);

    if (!user.avatar) {
      return user;
    }
    await s3Service.deleteFile(user.avatar);
    return await User.findByIdAndUpdate(
      userId,
      { $unset: { avatar: true } },
      { new: true }
    );
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("user is not found", 422);
    }
    return user;
  }
}
export const userService = new UserService();
