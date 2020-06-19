  
const router = require("express").Router();
const jwt = require('jsonwebtoken');
const Todos = require("./user-model.js");
const restricted = require("../auth/authenticate-middleware.js");

// const bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

router.post("/todos", restricted, (req, res) => {
  
  console.log(req.body);
  Todos.addTodo(req.body)
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => res.status(500).json({ message:"API Error", error: err.message}));
});

router.get("/:id/todos", restricted,  (req, res) => {
  Todos.findListById(req.params.id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => res.status(500).json({ message:"API Error", error: err.message}));
});

// function checkToDoInfo(body){
//   return Boolean(body.Title)
//   }

module.exports = router;



// todo list 
// {
//   id:Number,
//   title:"string",
//   complete:Boolean,
//   date:auto generated,

// }

// todo item
// {
//   id:Number,
//   title:"string",
//   description:"string",
//   date:auto generated when created in server,
//   complete:Boolean,
  

// }