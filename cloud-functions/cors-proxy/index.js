const fetch = require("node-fetch");

exports.corsProxy = (req, res) => {
  const { origin, host, ...headers } = req.headers;

  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type, x-redmine-api-key",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache"
  });

  const permittedMethods = ["GET", "OPTIONS", "POST"];
  if (!permittedMethods.includes(req.method)) {
    res.status(405).send();
    return;
  }

  if (req.method === "OPTIONS") {
    res.status(200).send();
    return;
  }

  const url = req.query.url;
  if (url == null) {
    res.status(401).send();
    return;
  }

  const method = req.method.toLowerCase();
  const body = JSON.stringify(req.body);

  fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      "x-redmine-api-key": headers["x-redmine-api-key"]
    },
    body: body !== "{}" ? body : undefined
  })
    .then(async fetchResponse => {
      const json = await fetchResponse.json();
      res.send(json);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
