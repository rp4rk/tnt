import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

interface QueryParameters {
  [key: string]: String | Number;
}

class RedmineApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3002/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('X-Redmine-API-Key', this.context.redmineKey);
  }

  async getProject(id: Number) {
    const { project } = await this.get(`projects/${id}.json`, {
      id
    });
    return project;
  }

  async getTimeEntry(id: Number) {
    const { time_entry } = await this.get(`time_entries/${id}.json`, {
      id
    });

    return time_entry;
  }

  async getTimeEntries({ projectId }: QueryParameters) {
    const { time_entries } = await this.get(`time_entries.json`, {
      project_id: projectId
    });

    return time_entries;
  }

  async getIssue(id: Number) {
    const { issue } = await this.get(`issues/${id}.json`, {
      id
    });

    return issue;
  }

  async getIssues({ projectId, issue_id }: QueryParameters) {
    const { issues } = await this.get(`issues.json`, {
      project_id: projectId
    });

    return issues;
  }
}

export default RedmineApi;
