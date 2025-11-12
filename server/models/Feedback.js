import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    customerName: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comments: String,
  },
  { timestamps: true }
);
export default mongoose.model("Feedback", FeedbackSchema);
