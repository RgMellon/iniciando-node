const express = require("express");

const users = ["Renan", "Moscinga", "Mocingona"];

const server = express();

//middleware global, ele é um interceptador, se n usar o next, ele n continua

server.use((req, res, next) => {
  console.log(`Metodo ${req.method}; ULR : ${req.url}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name)
    return res.status(400).json({ error: "Espera o param nome" });

  return next();
}

function existsUserInArray(req, res, next) {
  const user = users[req.params.id];

  if (!user) return res.status(400).json({ erro: "User n existe" });

  // fazendo isso, agora todas as rotas que tiverem acesso a
  // checkUserExists, agora tbm terá acesso a user, pois foi definido
  // logo abaixo.
  req.user = user;
  return next();
}

// end mdw

// modulo que entende json, por parametro o epress não conhece json nas req
server.use(express.json());

server.get("/users/:id", existsUserInArray, (req, res) => {
  // const { id } = req.params;
  // esse user vem do existsUserInArray, pois ele da acesso
  return res.json({
    message: `ola ${req.user}`
  });
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:id", checkUserExists, (req, res) => {
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
