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

app.listen(4003, async () => {
  console.log("Moderation listening on 4003");

  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event ", event.type);

      if (event.type === "CommentCreated") {
        console.log(event)
        const status = event.data.content.includes("orange")
          ? "rejected"
          : "approved";

        await axios.post("http://localhost:4005/events", {
          type: "CommentModerated",
          data: {
            id: event.data.id,
            postId: event.data.postId,
            status,
            content: event.data.content,
          },
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
});
