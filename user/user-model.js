  
const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  addTodo,
  findListById
};

function find() {
  return db("todos").orderBy("id");
}

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
    const [id] = await db("todos").insert(todoList, "id");

    return findListById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findListById(id) {
  return db("todos").where({ id }).first();
}