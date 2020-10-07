import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  if (! await knex.schema.hasTable('category')) {
    return await knex.schema.createTable('category', function (table) {
      table.increments().primary();
      table.string('cat_name');
    })
  }
}


export async function down(knex: Knex): Promise<void> {
}

