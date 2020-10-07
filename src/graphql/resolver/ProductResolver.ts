import { ContextType } from "../../ContextType"

const productList = async (_: any, {}: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const items = await knex('products').orderBy('id', 'desc');
  return items;
}

const productById = async (_: any, { id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const item = await knex('products').where({ id }).orderBy('id', 'desc').first();
  return item;
}

const productCreate = async (_: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('products').insert(data);
  return true;
}

const productUpdate = async (_: any, { data, id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('products').update(data).where({id});
  return true;
}

export const ProductResolver = {
  Query: {
    productList,
    productById
  },
  Mutation: {
    productCreate,
    productUpdate
  }
}