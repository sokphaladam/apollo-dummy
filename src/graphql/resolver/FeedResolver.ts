import { ContextType } from "../../ContextType";
import { random } from "faker";
const toonavatar = require('cartoon-avatar');

const FeedList = async (_: any, {}: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  const items = await knex('feeds').orderBy('created_at', 'desc');

  return items.map((x, i) => {
    return {
      ...x,
      contacts: x.contects,
      users: {
        id: i+1,
        display_name: 'Anonymous',
        url: toonavatar.generate_avatar({
          id: x.id
        })
      }
    }
  });
}

const FeedById = async (_: any, { Id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  const item = await knex('feeds').where({id: Id}).orderBy('created_at', 'desc').first();

  return {
    ...item,
    contacts: item.contects,
    users: {
      id: 0,
      display_name: 'Anonymous',
      url: toonavatar.generate_avatar({
        id: Math.floor(Math.random() * 10)
      })
    }
  };
}

const FeedCreate = async (_: any, { data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  await knex('feeds').insert({
    users: 0,
    contects: JSON.stringify(data)
  });

  return true;
}

export const FeedResolver = {
  Query: {
    FeedList,
    FeedById
  },
  Mutation: {
    FeedCreate
  }
}