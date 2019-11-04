import gql from 'graphql-tag';
import { GraphQLResolverMap } from '@apollographql/apollo-tools';
import { GQLContext } from '../types';

export const typeDef = gql`
  type Query {
    entry(id: Int!): TimeEntry
  }

  type TimeEntry {
    id: Int!
    hours: Float
    comments: String
    spent_on: String
    creation_on: String
    updated_on: String
    project: Project
    user: TimeEntryUser
    activity: TimeEntryActivity
  }

  type TimeEntryProject {
    id: Int
    name: String
  }

  type TimeEntryUser {
    id: Int
    name: String
  }

  type TimeEntryActivity {
    id: Int
    name: String
  }
`;

export const resolvers: GraphQLResolverMap<GQLContext> = {
  Query: {
    async entry(_, { id }, { dataSources }) {
      return dataSources.redmineAPI.getTimeEntry(id);
    }
  },
  TimeEntry: {
    async project(entry, _, { dataSources }) {
      return dataSources.redmineAPI.getProject(entry.project.id);
    }
  }
};
