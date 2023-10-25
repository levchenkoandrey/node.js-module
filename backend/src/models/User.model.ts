import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
import { EUserStatus } from "../enums/user-status.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: [3, "name mast be long two letter"],
    },
    age: {
      type: Number,
      min: [1, "Minimum value for age is 1"],
      max: [100, "Maximum value for age is 100"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    status: {
      type: String,
      default: EUserStatus.Inactive,
      enum: EUserStatus,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
