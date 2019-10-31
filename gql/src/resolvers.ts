export default {
  Query: {
    async project(_source: any, { id }: { id: Number }, { dataSources }: any) {
      return dataSources.redmineAPI.getProject(id);
    },
    async timeEntries(
      _source: any,
      { projectId }: { projectId: number },
      { dataSources }: any
    ) {
      return dataSources.redmineAPI.getTimeEntries(projectId);
    }
  },
  Project: {
    async entries({ id }: { id: number }, _: any, { dataSources }: any) {
      return dataSources.redmineAPI.getTimeEntries(id);
    }
  }
};
