conste express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cors());
const PORT = Process.env.PORT || 10000;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const image_model = "@cf/black-forest-labs/flux-1-schnell"

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Ciné-Genesis AI",
    imageModel: IMAGE_MODEL,
    apiKeyConfigured: Boolean(TOKEN)
  });
});

app.post("/api/generate-image", async (req, res) => {
  if (!TOKEN) {
    return res.status(503).json({ error: "Clé API manquante. Configurez REPLICATE_API_TOKEN dans l'environnement de l'hébergement." });
  }
  const prompt = req.body?.prompt;
  const aspect_ratio = req.body?.aspect_ratio || "9:16";
  if (typeof prompt !== "string" || prompt.trim().length < 3 || prompt.length > 5000) {
    return res.status(400).json({ error: "Saisissez un prompt de 3 à 5000 caractères." });
  }

  try {
    const response = await fetch(`https://api.replicate.com/v1/models/${IMAGE_MODEL}/predictions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait=20"
      },
      body: JSON.stringify({ input: { prompt: prompt.trim(), aspect_ratio } })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({ error: data.detail || data.error || `Replicate a répondu ${response.status}` });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Impossible de contacter Replicate. Réessayez." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Ciné-Genesis AI listening on ${PORT}`);
});
