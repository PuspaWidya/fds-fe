// api/[...path].js
export default async function handler(req, res) {
  try {
    const { path = [] } = req.query; // e.g. ["rule-configs"]
    // join to path and ensure single trailing slash when path not empty
    let backendPath = path.join("/").replace(/\/+$/g, "");
    if (backendPath) backendPath = `${backendPath}/`;

    // preserve query string if any
    const query =
      req.url && req.url.includes("?")
        ? req.url.slice(req.url.indexOf("?"))
        : "";

    const target = `http://103.139.193.155:8082/${backendPath}${query}`;
    console.log("Proxying to:", target);

    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers },
      redirect: "follow",
    };
    delete fetchOptions.headers.host;

    if (!["GET", "HEAD"].includes(req.method)) {
      // forward body for POST/PUT/PATCH/DELETE
      fetchOptions.body = req.body;
    }

    const response = await fetch(target, fetchOptions);

    // forward content-type if present
    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);

    // disable caching at edge (useful while debugging)
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
