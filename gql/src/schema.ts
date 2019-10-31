import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';

import {
  typeDef as projectType,
  resolvers as ProjectResolvers
} from './schema/project';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default executableSchema;
