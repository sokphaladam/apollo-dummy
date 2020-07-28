import { knex } from './setting';
import Knex from 'knex';
const toonavatar = require('cartoon-avatar');

export type ContextType = {
  knex: Knex,
  user: any;
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
    return{
      knex,
      user: getToken(req.headers.token)
    }
  }
}