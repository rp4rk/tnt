export const getProjectEndpoint = host =>
  `https://us-central1-tnt-app-237920.cloudfunctions.net/corsProxy?url=${host}/projects.json`;
