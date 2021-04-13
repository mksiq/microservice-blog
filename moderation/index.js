const express = require("express");
const axios = require("axios");
const { json } = require("express");

const app = express();

app.use(json());

app.post("/event", (req, res) => {});

app.listen(4003, () => {
  console.log("Moderation listening on 4003");
});
