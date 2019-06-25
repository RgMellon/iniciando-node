const express = require("express");

const users = ["Renan", "Moscinga", "Mocingona"];

const server = express();

server.get("/users/:index", (req, res) => {
  const id = req.params.index;

  return res.json({
    message: `ola ${users[id]}`
  });
});

server.listen(3000);
