const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

const events = [];

app.use(json());

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);

  console.log("Received Event", req.body.type);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('running on Kubernetes')
  console.log("Event listening on 4005");
});
