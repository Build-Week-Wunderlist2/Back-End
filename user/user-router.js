  
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

router.put('/todos/:id', restricted, (req, res) => {
  const changes = req.body;
  Todos.updateTodos(req.params.id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  });});

  router.delete('/todos/:id', (req, res) => {
    Todos.removeTodos(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been removed' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });});

    router.post("/task", restricted, (req, res) => {
  
      console.log(req.body);
      Todos.addTask(req.body)
        .then(task => {
          res.status(200).json(task);
        })
        .catch(err => res.status(500).json({ message:"API Error", error: err.message}));
    });

    router.get("/:id/task", restricted,  (req, res) => {
      Todos.findAllTaskById(req.params.id)
        .then(task => {
          res.status(200).json(task);
        })
        .catch(err => res.status(500).json({ message:"API Error", error: err.message}));
    });

    router.delete('/task/:id', (req, res) => {
      Todos.removeTask(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been removed' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      });});
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