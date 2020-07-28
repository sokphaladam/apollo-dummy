import Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.createTable('todos', function(table) {
    table.increments();
    table.string('title');
    table.text('description');
    table.timestamps(true, true);
    table.date('start_date');
    table.date('end_date');
    table.enu('status', ['New', 'Delegated', 'In-Progress', 'Canceled', 'Completed']).defaultTo('New');
  })
};

exports.down = function(knex: Knex) {
  
};
