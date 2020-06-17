exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
      users.increments();
  
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users.string('password', 255).notNullable();
    })
    .createTable('todos', tbl => {
        tbl.increments();
        
        tbl.string('Todo lists', 255).notNullable();
        tbl.string('description', 255).notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  