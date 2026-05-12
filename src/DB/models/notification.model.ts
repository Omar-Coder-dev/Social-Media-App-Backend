import { model, Schema, Types } from "mongoose";

const notificationSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["admin_blast", "post_react", "post_comment"], 
        default: "admin_blast" 
    },
    recipientId: { type: Schema.Types.ObjectId, ref: "User" }, // null if sent to everyone
    senderId: { type: Schema.Types.ObjectId, ref: "User" },    // The Admin or the reactor
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const notificationModel = model("Notification", notificationSchema);
export default notificationModel;