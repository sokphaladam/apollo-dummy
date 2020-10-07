import { ContextType } from "../../ContextType"

const inventoryList = async (_: any, { }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const items = await knex('inventory').orderBy('id', 'desc');
  return items;
}

const inventoryById = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const item = await knex('inventory').where({ id }).orderBy('id', 'desc').first();
  return item;
}

const inventoryCreate = async (_: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('inventory').insert(data);
  return true;
}

const inventoryUpdate = async (_: any, { data, id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('inventory').update(data).where({ id });
  return true;
}

const inventoryDelete = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('inventory').del().where({ id });
  return true;
}

export const inventoryResolver = {
  Query: {
    inventoryList,
    inventoryById
  },
  Mutation: {
    inventoryCreate,
    inventoryUpdate,
    inventoryDelete
  }
}