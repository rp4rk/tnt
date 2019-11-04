import RedmineApi from '../datasources/redmineApi';

export type GQLContext = {
  dataSources: {
    redmineAPI: RedmineApi;
  };
};
