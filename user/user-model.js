  
const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  findById,
  addTodo,
  findListById
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

async function addTodo(todoList) {
  try {
    const [user_id] = await db("todos").insert(todoList);

    return findTodoById(user_id);
  } catch (error) {
    throw error;
  }
}
function findTodoById(user_id) {
  return db("todos").where({ user_id }).first();
}
function findById(id) {
  return db("users").where({ id }).first();
}


function findListById(id) {

    return db('todos as t')
      .join('users as u', 't.user_id', 'u.id')
      .select('t.user_id', 't.title', 't.complete', 'u.id as id' )
      .where({ user_id: id });
  
}