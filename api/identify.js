export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { base64, lang } = req.body;
    if (!base64) return res.status(400).json({ error: "No image data provided" });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API key not configured on server" });

    const enPrompt = "You are an expert master plumber with 30+ years of experience identifying plumbing parts. When shown a plumbing photo, identify every visible component. Respond ONLY with a valid JSON array. Each object must have: id (number), name (short part name), category (one of: Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 sentences: what it is and what it does), codeStatus (one of: approved|grandfathered|not-approved), codeNote (brief code status note), stillMade (true or false), manufacturer (brand if visible or common brands), whereToFind (Home Depot|Ferguson|Grainger), estimatedCost (price range like $8-$15), proTip (one master plumber field tip), searchTerm (YouTube search term for repair video), affiliateSearch (Home Depot search keyword). If you cannot identify any plumbing parts, return an empty array [].";

    const esPrompt = "Eres un maestro plomero experto con mas de 30 anos de experiencia identificando partes de plomeria. Identifica cada componente visible en la foto. Responde SOLO con un array JSON valido. Cada objeto debe tener: id (numero), name (nombre corto), category (Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 oraciones), codeStatus (approved|grandfathered|not-approved), codeNote, stillMade (true/false), manufacturer, whereToFind, estimatedCost, proTip, searchTerm, affiliateSearch. Si no puedes identificar partes, devuelve [].";

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 1500,
        system: lang === "es" ? esPrompt : enPrompt,
        messages: [{
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: "image/jpeg", data: base64 }
            },
            {
              type: "text",
              text: lang === "es"
                ? "Identifica cada parte de plomeria visible en esta foto. Devuelve solo el array JSON."
                : "Identify every plumbing part you can see in this photo. Return JSON array only."
            }
          ]
        }]
      })
    });

    const anthropicData = await anthropicRes.json();

    if (anthropicData.error) {
      console.error("Anthropic error:", anthropicData.error);
      return res.status(500).json({ error: "Anthropic: " + anthropicData.error.message });
    }

    const text = (anthropicData.content || []).map(i => i.text || "").join("").trim();
    const clean = text.replace(/```json|```/g, "").trim();

    let parts = [];
    try {
      const parsed = JSON.parse(clean);
      parts = Array.isArray(parsed) ? parsed : [];
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr.message, "Raw text:", clean.substring(0, 200));
      return res.status(500).json({ error: "Could not parse response from AI" });
    }

    return res.status(200).json({ parts });

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
