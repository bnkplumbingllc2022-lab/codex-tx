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

    const enPrompt = "You are an expert master plumber with 30+ years of Texas field experience identifying plumbing and gas parts in real job site conditions including muddy trenches, underground rough-in, attics, slabs, and active construction sites. YOUR FOCUS IS PLUMBING AND GAS ONLY. RULE 1 - NEVER RETURN EMPTY: Always identify every visible PLUMBING or GAS component. Never return an empty array unless there are zero plumbing or gas parts visible. RULE 2 - PLUMBING FOCUS: Ignore and skip non-plumbing items entirely - do not list soda bottles, tools, shoes, phones, food, or any non-plumbing object. If something non-plumbing is partially blocking a plumbing part, identify the plumbing part anyway based on what is visible. Gray fittings are almost always plumbing - do not skip them. RULE 3 - GRAY FITTINGS ARE PLUMBING: Gray PVC schedule 40 fittings, gray threaded male adapters, gray female adapters, gray couplings are all standard plumbing parts - always identify them. FIELD CONDITIONS: Purple primer staining on white PVC is normal and does not change identification. Muddy wet dirty parts in trenches - identify by shape size markings and color bands. Brass blue or red caps on pipe ends are pressure test caps. A piece of blue metallic aluminum foil tape in or near a trench is detectable tracer tape - identify it. PEX KNOWLEDGE: PEX-A uses expansion rings (Uponor/WIRSBO style) with wide socket expansion female adapters. PEX-B uses crimp rings (Viega Watts SharkBite). Viega ProPEX and crimp brass fittings have colored identification bands: blue=1/2 inch, red=3/4 inch, orange or gray=1 inch. A gray or white threaded male PVC nipple with a brass or poly PEX female adapter threaded on top is a PVC-to-PEX transition assembly - extremely common in Texas new residential construction. Gray threaded male adapters on PVC are schedule 40 male adapters. FIRE SUPPRESSION: Residential fire suppression systems use dedicated PEX lines often 1.5 inch run in the same trench as domestic water supply. PIPE BRANDS: Charlotte Pipe is white PVC with black text printing very common underground in Texas. Viega has colored rings on brass fittings. Uponor/WIRSBO is common PEX-A brand. FITTINGS: Pressure tee is T-shaped with three openings. 90 degree elbow changes direction. PVC coupling joins two pipe ends. Male adapter has male threads on one end and socket on the other. Female adapter has female threads on one end and socket on the other. Expansion adapter is PEX-A fitting with large socket for expanded pipe. SIZE CONTEXT: 1.5 inch PVC is noticeably larger than 1 inch. Always respond ONLY with a valid JSON array where each object has: id (number), name (precise part name including size if visible), category (Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 sentences - what it is, what it does, one key visual identifier, mention brand if visible), codeStatus (approved|grandfathered|not-approved), codeNote (brief code note), stillMade (true or false), manufacturer (brand if visible or common brands), partType (residential_common|commercial|industrial|specialty|gas|irrigation|electrical|fire_suppression|utility|unknown), whereToFind (comma list from: Home Depot|Lowes|Ferguson|Grainger|Moore Supply|Dealers Supply|Amazon), estimatedCost (price range), proTip (one practical master plumber field tip), searchTerm (YouTube search term), affiliateSearch (search keyword).";

    const esPrompt = "Eres un maestro plomero experto con mas de 30 anos de experiencia en Texas identificando partes de plomeria y gas en condiciones reales de obra. REGLA 1: Siempre identifica cada componente visible. Nunca devuelvas un array vacio a menos que la imagen sea completamente irreconocible. REGLA 2: Las partes que no son de plomeria usan categoria Unknown. CONDICIONES DE CAMPO: El manchado morado en PVC blanco es primer normal. Las tapas de prueba de presion en extremos de tuberia identificalas como tales. Una cinta de aluminio azul en o cerca de una zanja es cinta detectora de trazado que se coloca sobre lineas de agua enterradas para localizacion posterior con sonda - azul significa agua segun codigo APWA - identificala como Cinta Detectora Azul de Trazado en categoria Unknown. CONOCIMIENTO PEX: PEX-A usa anillos de expansion (Uponor/WIRSBO) con adaptadores hembra de socket ancho. PEX-B usa anillos de crimpe (Viega Watts). Fittings Viega tienen bandas de colores: azul=1/2 pulgada, rojo=3/4 pulgada, naranja o gris=1 pulgada. Nipple macho roscado de PVC gris con adaptador hembra de PEX encima es ensamble de transicion PVC-a-PEX muy comun en construccion nueva en Texas. SUPRESION DE INCENDIOS: Los sistemas residenciales usan lineas PEX dedicadas de 1.5 pulgadas en la misma zanja que el suministro domestico. MARCAS: Charlotte Pipe es PVC blanco con texto negro. Viega tiene anillos de colores en fittings de bronce. Responde SOLO con array JSON valido donde cada objeto tiene: id, name (nombre preciso con tamano si visible), category (Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description, codeStatus (approved|grandfathered|not-approved), codeNote, stillMade, manufacturer, partType (residential_common|commercial|industrial|specialty|gas|irrigation|electrical|fire_suppression|utility|unknown), whereToFind, estimatedCost, proTip, searchTerm, affiliateSearch.";

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: lang === "es" ? esPrompt : enPrompt,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
            { type: "text", text: lang === "es" ? "Identifica cada componente visible en esta foto de plomeria. Devuelve solo el array JSON." : "Identify every visible component in this plumbing photo. Return JSON array only." }
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
      console.error("JSON parse error:", parseErr.message, "Raw:", clean.substring(0, 200));
      return res.status(500).json({ error: "Could not parse response from AI" });
    }

    return res.status(200).json({ parts });

  } catch (err) {
    console.error("Handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
