import RedmineApi from '../datasources/redmineApi';

type GQLContext = {
  dataSources: {
    redmineAPI: RedmineApi;
  };
};

export type ResolverFn = (parent: any, args: any, ctx: GQLContext) => any;

export interface ResolverMap {
  [key: string]: ResolverFn;
}
