import gql from 'graphql-tag';
import { ResolverMap } from '../types';

export const typeDef = gql`
  type Project {
    id: Int!
    name: String!
    description: String
    entries: [TimeEntry]
  }
`;

export const resolvers: ResolverMap = {
  async entries({ id }, _, { dataSources }) {
    return dataSources.redmineAPI.getTimeEntries(id);
  }
};
