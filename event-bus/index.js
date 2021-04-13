const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

app.use(json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK" });
});

app.post("/events", (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

app.listen(4005, () => {
  console.log("Event listening on 4005");
});
