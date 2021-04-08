const express = require("express");
const { randomBytes } = require("crypto");
const { json } = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());

app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log("requested for /comments");
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  console.log("Created comment");
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening at port 4001: http://localhost:4001");
});
