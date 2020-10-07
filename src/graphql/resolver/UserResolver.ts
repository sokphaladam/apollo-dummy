import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { ContextType } from "../../ContextType";
const toonavatar = require("cartoon-avatar");

const UserList = async (_: any, {}, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user = await ctx.user;

  const users = await knex("users").whereNot({ id: user.id });

  return users.map((x) => {
    return {
      ...x,
      url: toonavatar.generate_avatar({
        id: x.id,
        gender: x.gender === "M" ? "male" : "female",
      }),
    };
  });
};

const me = async (_: any, {}, ctx: ContextType) => {
  const { user } = await ctx;
  return user;
};

const loginUser = async (
  _: any,
  { username, password }: any,
  ctx: ContextType
) => {
  const { knex } = await ctx;

  const users = await knex("users").where({ username, password }).first();

  return users.token;
};

export const UserResolver = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    me,
    UserList,
  },
  Mutation: {
    loginUser,
  },
  Subscription: {
    TodoCreated: {
      subscribe: (_: any, {}, ctx: ContextType) =>
        ctx.pubsub.asyncIterator(["@ADDTODO"]),
    },
    CommentCreated: {
      subscribe: (_: any, {}, ctx: ContextType) =>
        ctx.pubsub.asyncIterator(["@ADDCOMMENT"]),
    },
    TodoUpdated: {
      subscribe: (_: any, {}, ctx: ContextType) =>
        ctx.pubsub.asyncIterator(["@EDITTODO"]),
    },
  },
};
