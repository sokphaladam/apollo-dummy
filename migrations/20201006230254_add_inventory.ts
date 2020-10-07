import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  if (! await knex.schema.hasTable('inventory')) {
    return await knex.schema.createTable('inventory', function (table) {
      table.increments().primary();
      table.integer('pro_id');
      table.string('stock_name');
      table.integer('unit');
    })
  }
}


export async function down(knex: Knex): Promise<void> {
}

