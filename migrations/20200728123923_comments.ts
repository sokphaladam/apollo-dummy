import Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.integer('todo_id');
    table.integer('user_id');
    table.text('text');
    table.timestamps(true, true);
  })
};

exports.down = function(knex: Knex) {
  
};
