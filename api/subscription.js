export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ tier: "free" });
    const cleanEmail = email.toLowerCase().trim();

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("Missing Supabase env vars in subscription");
      return res.status(200).json({ tier: "free" });
    }

    const subRes = await fetch(
      `${SUPABASE_URL}/rest/v1/subscriptions?email=eq.${encodeURIComponent(cleanEmail)}&select=tier,period_end`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        }
      }
    );

    const data = await subRes.json();

    if (!data || data.length === 0) return res.status(200).json({ tier: "free" });

    const sub = data[0];
    if (sub.period_end && new Date(sub.period_end) < new Date()) {
      return res.status(200).json({ tier: "free" });
    }

    return res.status(200).json({ tier: sub.tier || "free" });

  } catch (err) {
    console.error("Subscription check error:", err.message);
    return res.status(200).json({ tier: "free" });
  }
}
