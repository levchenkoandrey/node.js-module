import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../Types";

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

  public async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("user is not found", 422);
    }
    return user;
  }
}
export const userService = new UserService();
