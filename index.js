const express = require("express");

const users = ["Renan", "Moscinga", "Mocingona"];

const server = express();

// modulo que entende json, por parametro o epress não conhece json nas req
server.use(express.json());

server.get("/users/:index", (req, res) => {
  const id = req.params.index;

  return res.json({
    message: `ola ${users[id]}`
  });
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;

  const { user } = req.body;

  users[id] = user;

  return res.json(users);
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(users);
});

server.listen(3000);
