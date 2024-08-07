import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import qsnRoutes from "./routes/qsnRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

app.use(cors({
  origin: "https://jeelore.site",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/qsn", qsnRoutes);


app.listen(PORT, () => {
  console.log("server is running on port", PORT);
  connectMongoDB();
});
