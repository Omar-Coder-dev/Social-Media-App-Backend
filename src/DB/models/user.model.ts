import { model, Schema } from "mongoose";
import { GenderEnum, IUser, ProviderEnum, RoleEnum } from "../../modules/users/user.type";
import mongoose from "mongoose";

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
    role: {
    type: Number,
    enum: [RoleEnum.user, RoleEnum.admin],
    default: RoleEnum.user
},
friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
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

userSchema.pre(/^find/, function (this: mongoose.Query<any, any>) {
  this.where({ isDeleted: false });
});

userSchema.pre("findOneAndDelete", async function (this: mongoose.Query<any, any>) {
  const user = await this.model.findOne(this.getQuery());
  if (user) {
    try {
      await mongoose.model("Post").deleteMany({ userId: user._id });
      await mongoose.model("Comment").deleteMany({ userId: user._id });
    } catch (err) {
      console.error("Cascade delete failed:", err);
    }
  }
});


export const userModel = model<IUser>("User", userSchema);

export default userModel;