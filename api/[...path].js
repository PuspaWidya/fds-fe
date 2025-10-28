// api/[...path].js
export default async function handler(req, res) {
  try {
    const { path = [] } = req.query; // Vercel provides this for [...path]
    // join path parts into backend path (no leading/trailing duplicates)
    let backendPath = path.join("/");

    // Ensure exactly one trailing slash when path is not empty
    if (backendPath) {
      backendPath = backendPath.replace(/\/+$/g, ""); // remove trailing slashes
      backendPath = `${backendPath}/`; // add single trailing slash
    }

    // preserve the query string from original request (including our added _t)
    const query = req.url.includes("?")
      ? req.url.slice(req.url.indexOf("?"))
      : "";

    const target = `http://103.139.193.155:8082/${backendPath}${query}`;
    console.log("Proxying to:", target);

    // Build fetch options
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers },
      // let node/fetch follow redirects by default
    };
    // remove host header to avoid backend confusion
    delete fetchOptions.headers.host;

    // attach body for non-GET/HEAD
    if (!["GET", "HEAD"].includes(req.method)) {
      fetchOptions.body = req.body;
    }

    const response = await fetch(target, fetchOptions);

    // forward important headers
    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);

    // disable caching at Vercel edge so you always get fresh result while debugging
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
