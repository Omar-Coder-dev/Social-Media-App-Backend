import { Types } from "mongoose";

export interface ICreatePost {
  content: string;
  userId: string;
}

export interface IReaction {
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
}