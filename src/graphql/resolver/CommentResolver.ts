import { ContextType } from "../../ContextType";
const toonavatar = require('cartoon-avatar');

const CommentList = async (_: any, { todo_id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  const comments = await knex('comments').where({ todo_id });
  const users = await knex('users').whereIn('id', comments.map(x => x.user_id));

  return comments.map(x => {
    const user = users.find(u => u.id === x.user_id);
    return {
      ...x,
      user: {
        ...user,
        url: toonavatar.generate_avatar({
          id: user.id,
          gender: user.gender === 'M' ? 'male': 'female'
        })
      }
    }
  })
}

const CommentCreate = async (_: any, { id, text }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user;

  const comment = await knex('comments').insert({
    text,
    user_id: user.id,
    todo_id: id
  });

  await ctx.pubsub.publish('@ADDCOMMENT', {
    CommentCreated: {
      text,
      user,
      todo_id: id,
      id: comment[0],
    }
  });

  return true;
}

export const CommentResolver = {
  Query: {
    CommentList,
  },
  Mutation: {
    CommentCreate
  }
}