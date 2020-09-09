import Knex from "knex";

exports.up = async function(knex: Knex) {
  if(await knex.schema.hasTable('users')) return;
  return await knex.schema.createTable('users', function(table) {
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
