export default async function handler(req, res) {
  const { path = [] } = req.query;
  const url = `http://103.139.193.155:8082/${path.join("/")}`;

  const response = await fetch(
    url + (req.url.includes("?") ? req.url.split("?")[1] : ""),
    {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    }
  );

  const data = await response.text();

  res.status(response.status).send(data);
}
