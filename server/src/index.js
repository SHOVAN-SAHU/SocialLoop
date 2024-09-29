import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./DB/connectDB.js";
import { app, server } from "./socket/socket.js";

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import followRouter from "./routes/follow.routes.js";
app.use("/api/v1/follow", followRouter);

import postRouter from "./routes/post.routes.js";
app.use("/api/v1/posts", postRouter);

import likeRouter from "./routes/like.routes.js";
app.use("/api/v1/likes", likeRouter);

import commentRouter from "./routes/comment.routes.js";
app.use("/api/v1/comments", commentRouter);

import messageRouter from "./routes/message.routes.js";
app.use("/api/v1/messages", messageRouter);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server running ar PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connecttion failed", err);
  });
