import { model, Schema } from "mongoose";
import { GenderEnum, IUser, ProviderEnum } from "../../modules/users/user.type";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type:Number,
      enum: [GenderEnum.male, GenderEnum.female], 
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    changedCredentialsAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isProvier: {
      type: Number,
      default: ProviderEnum.system,
      enum: [ProviderEnum.system, ProviderEnum.google],
    },
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON:{
        virtuals: true,
        getters: true,
    }
    ,toObject:{
        virtuals: true,
        getters: true,
    }
  }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;