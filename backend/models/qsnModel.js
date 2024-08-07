import { text } from "express";
import mongoose from "mongoose";

const qsnSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },

    answer: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Solved", "Unsolved"],
    },
    solvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    difficulty: {
      enum: [
        "Neet",
        "Neet+",
        "JeeMains",
        "JeeMains+",
        "JeeAdvanced",
        "JeeAdvanced+",
        "olympiad",
      ],
      type: String,
    },
    subject: {
      enum: ["Maths", "Physics", "Chemistry", "Biology"],
      type: String,
    },
    topic: {
      type: String,
    },
    type: {
      type: String,
      enum: ["MCQ", "Numerical", "Subjective"],
    },
    
    solution: [
        {
            text: {
              type: String,
            },
            image: {
              type: String,
            },
            postedBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            isApproved: {
              type: Boolean,
              default: false,
            },
        }
    ],
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        image:{
          type:String
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Qsn = mongoose.model("Qsn", qsnSchema);
export default Qsn;
