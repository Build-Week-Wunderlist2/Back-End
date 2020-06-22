  
const db = require("../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  findById,
  addTodo,
  findListById,
  updateTodos,
  removeTodos,
  addTask,
  findTaskById,
  findAllTaskById,
  removeTask
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
      .select('t.user_id', 't.title', 't.complete','t.created_at', 't.id as id' )
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

async function addTask(task) {
  try {
    const [id] = await db("task").insert(task, "id");

    return findTaskById(id);
  } catch (error) {
    throw error;
  }
}
function findTaskById(id) {
  return db("task").where({ id }).first();
}

function findAllTaskById(id) {

  return db('task as t')
    .join('todos as u', 't.task_id', 'u.id')
    .select('t.task_id', 't.description', 't.complete','t.created_at', 'u.title','t.id as id' )
    .where({ task_id: id });

}

function removeTask(id) {
  return db('task')
    .where('id', id)
    .del();
}
