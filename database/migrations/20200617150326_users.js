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
        tbl.timestamps([true], [true])
        tbl.string('title', 255).notNullable();
        tbl.boolean('complete').defaultTo(false);
        tbl.date('deadline');
        tbl.integer('user_id')
        
                      .unsigned()
                      .notNullable()
                     
                      .references('users.id')
                     
                      .onDelete('CASCADE')
                      .onUpdate('CASCADE');
    })
    .createTable('task', tbl => {
             
      tbl.increments();
      tbl.timestamps([true], [true])
      tbl.string('description', 255);
      tbl.boolean('complete').defaultTo(false);
      tbl.boolean('repeatsDaily').defaultTo(false);
      tbl.boolean('repeatsWeekly').defaultTo(false);
      tbl.boolean('repeatsMonthly').defaultTo(false);
      tbl.date('deadline');
      tbl.integer('task_id')
                    .unsigned()
                    .notNullable()
                   
                    .references('todos.id')
                   
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
  })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('task')
          .dropTableIfExists('todos')
          .dropTableIfExists('users')
  };
  