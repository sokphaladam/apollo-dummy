import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  if(! await knex.schema.hasTable('products')){
    return await knex.schema.createTable('products', function(table){
      table.increments().primary();
      table.string('code');
      table.string('name');
      table.string('description');
      table.decimal('price');
      table.integer('cat_id');
      table.integer('current_stock').defaultTo(0);
      table.timestamps(true, true);
    })
  }
}


export async function down(knex: Knex): Promise<void> {
}

