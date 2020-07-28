const settting = require('../knexfile');
export const knex = require('knex')(settting.development);