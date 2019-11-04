import gql from 'graphql-tag';
import { GQLContext } from '../types';
import { GraphQLResolverMap } from '@apollographql/apollo-tools';

export const typeDef = gql`
  type Query {
    project(id: Int!): Project
  }

  type Project {
    id: Int!
    name: String!
    description: String
    entries: [TimeEntry]
    issues: [Issue]
  }
`;

export const resolvers: GraphQLResolverMap<GQLContext> = {
  Query: {
    project: async (_source, { id }, { dataSources }) => {
      return dataSources.redmineAPI.getProject(id);
    }
  },
  Project: {
    entries: async ({ id }, _, { dataSources }) => {
      return dataSources.redmineAPI.getTimeEntries({
        projectId: id
      });
    },
    issues: async ({ id }, _, { dataSources }) => {
      return dataSources.redmineAPI.getIssues({
        projectId: id
      });
    }
  }
};
