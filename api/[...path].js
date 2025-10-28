export default async function handler(req, res) {
  try {
    const { path = [] } = req.query; // from Vercel routing
    // build backend path
    let backendPath = path.join("/");
    // ensure trailing slash if api expects it (safe even if backend accepts no trailing slash)
    if (backendPath && !backendPath.endsWith("/")) backendPath += "/";
    const query = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";

    const target = `http://103.139.193.155:8082/${backendPath}${query}`;
    console.log("Proxying to:", target);

    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers },
    };

    // remove host to avoid forwarding Vercel host
    delete fetchOptions.headers.host;

    if (!["GET", "HEAD"].includes(req.method)) {
      // body can be a stream or raw
      fetchOptions.body = req.body;
    }

    const response = await fetch(target, fetchOptions);

    // copy response headers we care about
    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("content-type", contentType);

    // disable caching by default (optional)
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
