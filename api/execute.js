const ALLOWED_ORIGINS = new Set([
  "https://thanish2910.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);

function send(res, status, body) {
  res.status(status).json(body);
}

function setCors(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function judgeHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (process.env.JUDGE0_API_KEY) {
    headers["X-Auth-Token"] = process.env.JUDGE0_API_KEY;
  }
  return headers;
}

function judgeBase() {
  return (process.env.JUDGE0_API_URL || "https://ce.judge0.com").replace(/\/+$/, "");
}

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const origin = req.headers.origin || "";
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return send(res, 403, { error: "This origin is not allowed to use the C Studio compiler." });
  }

  if (req.method === "POST") {
    const { source_code, stdin = "" } = req.body || {};
    if (typeof source_code !== "string" || !source_code.trim()) {
      return send(res, 400, { error: "Enter some C code before running it." });
    }
    if (source_code.length > 30000 || typeof stdin !== "string" || stdin.length > 4000) {
      return send(res, 413, { error: "Code or input is too large for this practice runner." });
    }

    try {
      const upstream = await fetch(judgeBase() + "/submissions?base64_encoded=false&wait=false", {
        method: "POST",
        headers: judgeHeaders(),
        body: JSON.stringify({
          source_code,
          language_id: 50,
          stdin,
          cpu_time_limit: 2,
          cpu_extra_time: 1,
          wall_time_limit: 5,
          memory_limit: 128000
        })
      });
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        const status = upstream.status === 401 || upstream.status === 403 ? 502 : 503;
        return send(res, status, {
          error: upstream.status === 401 || upstream.status === 403
            ? "The configured compiler service rejected its credentials. Check JUDGE0_API_KEY in Vercel."
            : "The compiler service could not accept this submission.",
          upstream_status: upstream.status,
          detail: data.error || data.message || null
        });
      }
      if (!data.token) return send(res, 502, { error: "The compiler service did not return a submission token." });
      return send(res, 202, { token: data.token });
    } catch (error) {
      return send(res, 502, { error: "Could not reach the compiler service.", detail: error.message });
    }
  }

  if (req.method === "GET") {
    const token = typeof req.query.token === "string" ? req.query.token : "";
    if (!/^[a-f0-9-]{20,60}$/i.test(token)) {
      return send(res, 400, { error: "A valid submission token is required." });
    }
    try {
      const upstream = await fetch(
        judgeBase() + "/submissions/" + encodeURIComponent(token) + "?base64_encoded=false&fields=stdout,stderr,compile_output,message,status,time,memory",
        { headers: judgeHeaders() }
      );
      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        return send(res, upstream.status === 401 || upstream.status === 403 ? 502 : 503, {
          error: "Could not retrieve the compiler result.",
          upstream_status: upstream.status
        });
      }
      return send(res, 200, {
        stdout: data.stdout || "",
        stderr: data.stderr || "",
        compile_output: data.compile_output || "",
        message: data.message || "",
        status: data.status || { id: 1, description: "In Queue" },
        time: data.time || null,
        memory: data.memory || null
      });
    } catch (error) {
      return send(res, 502, { error: "Could not reach the compiler service.", detail: error.message });
    }
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return send(res, 405, { error: "Method not allowed." });
};