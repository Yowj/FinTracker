import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fintracker_users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date, // CHANGED from String to Date
      required: true,
    },

    description: {
      type: String,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },

  { timestamps: true }
);

const Transaction = mongoose.model("fintracker_transactions", transactionSchema);

export default Transaction;
