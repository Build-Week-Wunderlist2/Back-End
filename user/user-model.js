  
const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  findById,
  addTodo,
  findListById,
  updateTodos,
  removeTodos
};



function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function addTodo(todoList) {
  try {
    const [id] = await db("todos").insert(todoList, "id");

    return findTodoById(id);
  } catch (error) {
    throw error;
  }
}
function findTodoById(id) {
  return db("todos").where({ id }).first();
}

function findListById(id) {

    return db('todos as t')
      .join('users as u', 't.user_id', 'u.id')
      .select('t.user_id', 't.title', 't.complete','t.date', 't.id as id' )
      .where({ user_id: id });
  
}

function updateTodos(id, changes) {
  return db('todos')
    .where({ id })
    .update(changes);
}

function removeTodos(id) {
  return db('todos')
    .where('id', id)
    .del();
}
