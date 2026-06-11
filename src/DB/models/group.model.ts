import mongoose, { model, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    group: { type: String, required: true }, // Group Name
    group_image: { type: String, default: "" },
    roomId: { type: String, required: true, unique: true }, // The socket room identifier
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        content: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const groupModel = model("Group", groupSchema);
export default groupModel;