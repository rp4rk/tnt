// CORS Proxy is only in use for production
const corsProxy =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://us-central1-tnt-app-237920.cloudfunctions.net/corsProxy?url=';

const corsProxyWithoutParam =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://us-central1-tnt-app-237920.cloudfunctions.net/corsProxy';

// Set to the development host if not in production
const devHost =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : false;

export const getProjectEndpoint = host =>
  `${corsProxy}${devHost || host}/projects.json?include=time_entry_activities`;

export const getTimeEntryEndpoint = host =>
  `${corsProxy}${devHost || host}/time_entries.json`;

export const getTimeEntryEndpointWithParams = (host, params) => {
  //add url params to both url before finalising full url
  var redmineURL = new URL(`${host}/time_entries.json`);
  redmineURL.search = new URLSearchParams({
    from: params.from,
    to: params.to,
    project_id: params.project_id,
    limit: 250
  });

  var url = new URL(corsProxyWithoutParam);
  url.search = new URLSearchParams({
    url: redmineURL
  });

  return url;
};

export const getIssuesEndpoint = (host, params) => {
  const url = new URL(
    `${corsProxy}${devHost || host}/issues.json?project_id=${params.project_id}`
  );

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  return url;
};
