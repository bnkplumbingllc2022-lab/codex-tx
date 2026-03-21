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

    const enPrompt = "You are an expert master plumber with 30+ years of experience identifying plumbing, gas, and mechanical parts. CRITICAL RULES: 1) ALWAYS identify EVERY visible component in the photo — plumbing or not. Never return an empty array. If something is visible, identify it. 2) If a part is not a plumbing part — such as an irrigation fitting, electrical conduit adapter, pneumatic fitting, or any non-plumbing component — still identify it and use category 'Unknown' with a note explaining what trade it belongs to. 3) NEVER skip a part just because it is not plumbing. A photo with two irrigation fittings and three plumbing parts should return all five items. 4) Look at the OVERALL shape, size, and context before naming a part. A hose bib has a threaded female inlet and a handle perpendicular to the spout — do NOT confuse it with a water heater drain valve which is inline and smaller. 5) If you see a handle, note whether it is a gate, ball, or hose bib style. 6) Water heater drain valves are small, often plastic, located near the bottom of a tank. Hose bibs protrude from walls and have a vacuum breaker or packing nut. 7) Look at the ORIENTATION and INSTALLATION CONTEXT — a part installed on an exterior wall is almost certainly a hose bib or sillcock, not a tank valve. 8) If unsure between two parts, pick the most likely based on visible context and note the uncertainty in the description. Respond ONLY with a valid JSON array — NEVER empty unless the photo shows absolutely nothing at all. Each object must have: id (number), name (precise part name), category (one of: Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 sentences: what it is, what it does, and one key visual identifier — if non-plumbing note which trade it belongs to), codeStatus (one of: approved|grandfathered|not-approved), codeNote (brief code note or 'Non-plumbing component' if applicable), stillMade (true or false), manufacturer (brand if visible or most common brands), partType (one of: residential_common|commercial|industrial|specialty|gas|irrigation|electrical|unknown), whereToFind (comma list from: Home Depot|Lowes|Ferguson|Grainger|Moore Supply|Dealers Supply|Amazon), estimatedCost (price range), proTip (one field tip), searchTerm (YouTube search term), affiliateSearch (search keyword).";

    const esPrompt = "Eres un maestro plomero experto con mas de 30 anos de experiencia identificando partes de plomeria, gas y mecanicas. REGLAS CRITICAS: 1) SIEMPRE identifica CADA componente visible en la foto — sea de plomeria o no. NUNCA devuelvas un array vacio. 2) Si una parte NO es de plomeria — como un accesorio de irrigacion, adaptador de conduit electrico, o accesorio neumatico — identificala de todas formas usando la categoria 'Unknown' con una nota explicando a que oficio pertenece. 3) NUNCA omitas una parte solo porque no es de plomeria. 4) Observa la forma general y contexto antes de nombrar una parte. 5) Si no estas seguro, elige la mas probable y menciona la incertidumbre. Identifica cada componente visible. Responde SOLO con array JSON valido — NUNCA vacio a menos que la foto no muestre absolutamente nada. Cada objeto: id, name, category (Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description, codeStatus (approved|grandfathered|not-approved), codeNote, stillMade, manufacturer, partType (residential_common|commercial|industrial|specialty|gas|irrigation|electrical|unknown), whereToFind, estimatedCost, proTip, searchTerm, affiliateSearch.";

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
