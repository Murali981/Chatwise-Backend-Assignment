const express = require("express");

const userRouter = require("./routes/userRoutes");

const postRouter = require("./routes/postRoutes");

const friendRequestRouter = require("./routes/friendRequestRoutes");

const commentRouter = require("./routes/commentRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/friend-requests", friendRequestRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

module.exports = app;
