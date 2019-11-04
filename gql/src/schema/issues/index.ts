import gql from 'graphql-tag';
import { GraphQLResolverMap } from '@apollographql/apollo-tools';
import { GQLContext } from '../types';

export const typeDef = gql`
  type Query {
    issue(id: Int!): Issue
  }

  type IssueGeneric {
    id: Int!
    name: String
  }

  type Issue {
    id: Int!
    subject: String!
    description: String!
    start_date: String
    due_date: String
    done_ratio: Float
    is_private: Boolean
    estimated_hours: Float
    created_on: String
    updated_on: String
    closed_on: String
    project: IssueGeneric
    tracker: IssueGeneric
    status: IssueGeneric
    priority: IssueGeneric
    author: IssueGeneric
    assigned_to: IssueGeneric
  }
`;

export const resolvers: GraphQLResolverMap<GQLContext> = {
  Query: {
    async issue(_, { id }, { dataSources }) {
      return dataSources.redmineAPI.getIssue(id);
    }
  }
};
