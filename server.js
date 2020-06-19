const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('./auth/authenticate-middleware.js');
const authRouter = require('./auth/auth-router.js');
// const TodosRouter = require('../todos/todos-router.js');
const usersRouter = require("./user/user-router");
const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use("/api/user",authenticate, usersRouter);
// server.use('/api/todos', authenticate, TodosRouter);


server.get("/", (req, res) => {
    res.json({ api: "just getting started(api up)" });
  });

  
module.exports = server;
