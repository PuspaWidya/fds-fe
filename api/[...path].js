export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;
    const base = "http://103.139.193.155:8082";
    const fullPath = `${base}/${path.join("/")}`;

    const url =
      req.url.includes("?") && !req.url.endsWith("?")
        ? `${fullPath}${req.url.substring(req.url.indexOf("?"))}`
        : fullPath;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type");

    // Pastikan hanya kirim JSON ke FE, bukan HTML
    if (contentType && contentType.includes("application/json")) {
      res.setHeader("Content-Type", "application/json");
      res.status(response.status).send(text);
    } else {
      console.error("⚠️ API returned non-JSON:", text.slice(0, 200));
      res.status(502).json({ error: "Invalid response from backend" });
    }
  } catch (err) {
    console.error("🔥 Proxy error:", err);
    res.status(500).json({ error: "Proxy server error" });
  }
}
