const express = require("express");
const { randomBytes } = require("crypto");
const { json } = require("express");
const cors = require("cors");

const app = express();

app.use(json());

app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log("requested for /posts");
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening at port 4000: http://localhost:4000");
});
