import Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('display_name');
    table.string('username');
    table.string('password');
    table.string('token');
    table.enu('gender', ['M','F']);
    table.timestamps(true, true);
  })
};

exports.down = function(knex: Knex) {
  
};
