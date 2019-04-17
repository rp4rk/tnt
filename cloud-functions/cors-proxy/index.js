const request = require("request");

exports.corsProxy = (req, res) => {
  const { origin, host, ...headers } = req.headers;

  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type, x-redmine-api-key",
    "Content-Type": "application/json"
  });

  if (req.method !== "GET" && req.method !== "OPTIONS") {
    res.status(405).send();
    return;
  }

  if (req.method === "OPTIONS") {
    res.status(200).send();
  }

  const url = req.query.url;
  if (url == null) {
    res.status(401).send();
    return;
  }

  console.log("these are headers", headers);
  console.log("this is the url", url);

  request.get(
    {
      url,
      headers: {
        "content-type": "application/json",
        "x-redmine-api-key": headers["x-redmine-api-key"]
      },
      rejectUnauthorized: false
    },
    (error, response, body) => {
      if (error) {
        res.status(500).send(error);
        return;
      }

      console.log(response.headers);

      res.send(body);
    }
  );
};
