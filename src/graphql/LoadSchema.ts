import fs from 'fs';
import { gql } from 'apollo-server';

export function LoadSchema() {
  const files = fs.readdirSync( __dirname +  '/schema');
  const items = [];

  for(const file of files) {
    items.push(gql`${fs.readFileSync(__dirname + '/schema/'+file)}`);
  }

  return items;
}