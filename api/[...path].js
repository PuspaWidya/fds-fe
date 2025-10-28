export default async function handler(req, res) {
  const { path = [] } = req.query;

  // pastikan selalu ada trailing slash di akhir path (kecuali kosong)
  const backendPath = path.length ? `${path.join("/")}/` : "";
  const query = req.url.includes("?")
    ? req.url.slice(req.url.indexOf("?"))
    : "";

  const target = `http://103.139.193.155:8082/${backendPath}${query}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: { ...req.headers, host: undefined },
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const contentType = response.headers.get("content-type");
    res.status(response.status);

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      res.json(data);
    } else {
      const text = await response.text();
      res.send(text);
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
