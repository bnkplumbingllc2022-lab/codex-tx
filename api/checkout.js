export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { priceId, email } = req.body;
    if (!priceId || !email) return res.status(400).json({ error: "Missing priceId or email" });

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return res.status(500).json({ error: "Stripe not configured" });

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "mode": "subscription",
        "customer_email": email,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        "success_url": `https://codex-tx.vercel.app?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
        "cancel_url": `https://codex-tx.vercel.app?cancelled=true`,
        "allow_promotion_codes": "true",
        "billing_address_collection": "auto",
        "subscription_data[metadata][email]": email,
      }).toString()
    });

    const session = await stripeRes.json();

    if (session.error) {
      console.error("Stripe error:", session.error);
      return res.status(500).json({ error: session.error.message });
    }

    return res.status(200).json({ url: session.url, sessionId: session.id });

  } catch (err) {
    console.error("Checkout error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
