import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    qsnsUploaded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qsn",
        default: [],
      },
    ],
    qsnsSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qsn",
        default: [],
      },
    ],
    points: {
      type: Number,
      default: 0,
    },
    profileImg: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCvGZvoVQc9RCra5dB-yneBsEGSx5vdkKeQ&s",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
