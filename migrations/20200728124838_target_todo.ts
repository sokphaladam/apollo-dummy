import Knex from "knex";

exports.up = async function(knex: Knex) {
  if(await knex.schema.hasTable('todo_targets')) return;
  return await knex.schema.createTable('todo_targets', function(table) {
    table.increments();
    table.integer('todo_id');
    table.integer('user_id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex: Knex) {
  
};
