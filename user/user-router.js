  
const router = require("express").Router();

const Todos = require("./user-model.js");
const restricted = require("../auth/authenticate-middleware.js");


router.get("/todos", restricted,  (req, res) => {
  Todos.find()
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => res.send(err));
});

router.post("/todos", restricted,  (req, res) => {

  const newList = req.body;
  Todos.addTodo(newList)
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => res.send(err));
});

router.get("/todos/:id", restricted,  (req, res) => {
  Todos.findListById(req.params.id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => res.send(err));
});



module.exports = router;