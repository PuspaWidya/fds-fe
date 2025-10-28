export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;
    const base = "http://103.139.193.155:8082";
    const fullPath = `${base}/${path.join("/")}`;

    // tambahkan query string kalau ada
    const query = req.url.includes("?")
      ? req.url.substring(req.url.indexOf("?"))
      : "";
    const url = `${fullPath}${query}`;

    console.log("Proxy →", url);

    const response = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    const text = await response.text();

    if (contentType && contentType.includes("application/json")) {
      res.setHeader("Content-Type", "application/json");
      res.status(response.status).send(text);
    } else {
      res.status(502).json({
        error: "Invalid response from backend",
        detail: text.slice(0, 200),
      });
    }
  } catch (err) {
    console.error("🔥 Proxy error:", err);
    res.status(500).json({ error: "Proxy server error", detail: err.message });
  }
}
