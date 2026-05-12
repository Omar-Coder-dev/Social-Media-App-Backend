import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    text: { 
        type: String, 
        required: [true, "Comment text is required"] 
    },
    postId: { 
        type: Schema.Types.ObjectId, 
        ref: "Post", 
        required: true 
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
  },
  { timestamps: true }
);

commentSchema.pre(/^find/, function (this: mongoose.Query<any, any>) {
  this.where({ isDeleted: false });
});

const commentModel = model("Comment", commentSchema);
export default commentModel;