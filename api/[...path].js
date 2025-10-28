export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;
    const base = "http://103.139.193.155:8082";
    const fullPath = `${base}/${path.join("/")}`;
    const query = req.url.includes("?")
      ? req.url.substring(req.url.indexOf("?"))
      : "";
    const url = `${fullPath}${query}`;

    const response = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body:
        req.method !== "GET" && req.body ? JSON.stringify(req.body) : undefined,
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      res.setHeader("Content-Type", "application/json");
      res.status(response.status).send(text);
    } else {
      res.status(502).json({
        error: "Invalid backend response",
        preview: text.slice(0, 200),
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: err.message });
  }
}
