  
const router = require("express").Router();

const Todos = require("./user-model.js");
const restricted = require("../auth/authenticate-middleware.js");


router.get("/", restricted,  (req, res) => {
  Todos.find()
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => res.send(err));
});



module.exports = router;