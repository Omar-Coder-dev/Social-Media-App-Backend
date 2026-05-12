import mongoose, { model, Schema, Types } from "mongoose";

export enum ReactionEnum {
    like = "like",
    love = "love",
    haha = "haha",
    wow = "wow",
    sad = "sad",
    angry = "angry"
}

const postSchema = new Schema(
  {
    content: { 
        type: String, 
        required: [true, "Post content is required"] 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    // Facebook Emoji Requirement
    reactions: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        type: { 
            type: String, 
            enum: Object.values(ReactionEnum),
            default: ReactionEnum.like 
        }
      }
    ]
  },
  { timestamps: true }
);

// Soft Delete
postSchema.pre(/^find/, function (this: mongoose.Query<any, any>) {
  this.where({ isDeleted: false });
});


// Hard Delete
postSchema.pre("findOneAndDelete", async function (this: mongoose.Query<any, any>) {
  const post = await this.model.findOne(this.getQuery());
  if (post) {
    try {
      await mongoose.model("Comment").deleteMany({ postId: post._id });
    } catch (err) {
      console.error("Post cascade delete failed:", err);
    }
  }
});

const postModel = model("Post", postSchema);
export default postModel;