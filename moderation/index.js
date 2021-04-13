const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

app.use(json());

app.post("/events", async (req, res) => {
  let { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation listening on 4003");
});
