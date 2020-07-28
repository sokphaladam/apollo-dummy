import { ApolloServer } from 'apollo-server';
import { LoadSchema } from './graphql/LoadSchema';
import { LoadResolver } from './graphql/LoadResolver';
import { context } from './ContextType';
import { config } from 'dotenv';

config();

const server = new ApolloServer({
  typeDefs: LoadSchema(),
  resolvers: LoadResolver,
  context
});

server.listen(process.env.PORT);