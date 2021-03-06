const express = require("express");
const { randomBytes } = require("crypto");
const { json } = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());

app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log("requested for /posts");
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log(posts)
  console.log("Posts Listening at port 4000");
});
