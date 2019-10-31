import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class RedmineApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3002/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('X-Redmine-API-Key', this.context.redmineKey);
  }

  async getProject(id: number) {
    const { project } = await this.get(`projects/${id}.json`);
    return project;
  }

  async getTimeEntries(projectId: number) {
    const { time_entries } = await this.get(
      `time_entries.json?project_id=${projectId}`
    );

    return time_entries;
  }
}

export default RedmineApi;
