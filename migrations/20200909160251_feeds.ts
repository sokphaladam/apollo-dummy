import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  if(!await knex.schema.hasTable('feeds')){
    return await knex.schema.createTable('feeds', function(table){
      table.increments();
      table.integer('users');
      table.json('contects');
      table.integer('views').defaultTo(0);
      table.integer('likes').defaultTo(0);
      table.integer('comments').defaultTo(0);
      table.timestamps(true, true);
    })
  }
}


export async function down(knex: Knex): Promise<void> {
}

