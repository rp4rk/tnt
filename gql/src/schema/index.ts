import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

/**
 * Project Type
 */
import {
  typeDef as projectType,
  resolvers as projectResolvers
} from './project';

/**
 * Time Entries
 */
import {
  typeDef as entriesType,
  resolvers as entriesResolvers
} from './entries';

/**
 * Issues
 */
import { typeDef as issuesType, resolvers as issuesResolvers } from './issues';

export default makeExecutableSchema({
  typeDefs: mergeTypes([projectType, entriesType, issuesType]),
  resolvers: mergeResolvers([
    projectResolvers,
    entriesResolvers,
    issuesResolvers
  ])
});
