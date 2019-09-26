// CORS Proxy is only in use for production
const corsProxy =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://us-central1-tnt-app-237920.cloudfunctions.net/corsProxy?url=';

// Set to the development host if not in production
const devHost =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : false;

export const getProjectEndpoint = host =>
  `${corsProxy}${devHost || host}/projects.json?include=time_entry_activities`;

export const getTimeEntryEndpoint = host =>
  `${corsProxy}${devHost || host}/time_entries.json`;

export const getIssuesEndpoint = (host, params = {}) => {
  const url = new URL(`${corsProxy}${devHost || host}/issues.json`);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  return url;
};

export const getProjectIssues = (host, projectId) =>
  `${corsProxy}${devHost || host}/time_entries/${projectId}.json`;
