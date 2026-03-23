export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const SUPABASE_URL = process.env.SUPABASE_URL || "https://mgvrvvhbhhgwihkrrlge.supabase.co";
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndnJ2dmhiaGhnd2loa3JybGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5Nzk2NzksImV4cCI6MjA4OTU1NTY3OX0.AJL4NxfNW-uphpVjJPvlSt8v7BFlRaFvDulX42Lld6E";

  try {
    const { action, email, password } = req.body;

    // ── SIGN UP ──────────────────────────────────────────────
    if (action === "signup") {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Create user in Supabase Auth
      const signupRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
      const signupData = await signupRes.json();

      if (signupData.error) {
        return res.status(400).json({ error: signupData.error.message || "Signup failed" });
      }

      return res.status(200).json({
        success: true,
        user: { email: signupData.user?.email || email },
        token: signupData.access_token,
      });
    }

    // ── SIGN IN ──────────────────────────────────────────────
    if (action === "login") {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginRes.json();

      if (loginData.error) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.status(200).json({
        success: true,
        user: { email: loginData.user?.email || email },
        token: loginData.access_token,
      });
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
