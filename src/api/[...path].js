export default async function handler(req, res) {
  const { path = [] } = req.query;
  const target = `http://103.139.193.155:8082/${path.join("/")}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: { ...req.headers, host: undefined },
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
