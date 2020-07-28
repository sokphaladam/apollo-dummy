import { knex } from './setting';
import Knex from 'knex';
import { PubSub } from 'apollo-server';

const toonavatar = require('cartoon-avatar');
const pubsub = new PubSub();

export type ContextType = {
  knex: Knex;
  user: any;
  pubsub: PubSub;
}

async function getToken(token: string){
  const user = await knex('users').where({ token }).first();
  return {
    ...user,
    url: toonavatar.generate_avatar({
      id: user.id,
      gender: user.gender === 'M' ? 'male': 'female'
    })
  };
}

export const context = ({req}: any) => {
  if(req !== undefined){
    return {
      knex,
      user: req.headers.token === undefined ? {} : getToken(req.headers.token),
      pubsub
    }
  }
  else {
    return {
      knex,
      user: {},
      pubsub
    }
  }
}