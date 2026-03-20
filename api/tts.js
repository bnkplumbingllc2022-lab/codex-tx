export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { text, lang } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const apiKey = process.env.GOOGLE_TTS_KEY || "AIzaSyBBbeRX9ycA67jWBQHUvyHYUH52-A_iMwg";

    const languageCode = lang === "es" ? "es-US" : "en-US";
    const voiceName = lang === "es" ? "es-US-Journey-F" : "en-US-Journey-F";

    const ttsRes = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode,
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 0.95,
            pitch: 0,
          },
        }),
      }
    );

    const ttsData = await ttsRes.json();

    if (ttsData.error) {
      console.error("Google TTS error:", ttsData.error);
      return res.status(500).json({ error: ttsData.error.message });
    }

    return res.status(200).json({ audioContent: ttsData.audioContent });

  } catch (err) {
    console.error("TTS handler error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
