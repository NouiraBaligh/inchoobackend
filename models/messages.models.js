import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    sujet: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
