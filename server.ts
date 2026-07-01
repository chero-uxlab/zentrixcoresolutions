import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
  console.log("Gemini API Client successfully initialized.");
} else {
  console.warn("WARNING: GEMINI_API_KEY env variable is not set. A mock fallback response layer will be active.");
}

// 1. Live Chat Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request structure. 'messages' array is required." });
  }

  if (!ai) {
    // Graceful fallback when API key is missing
    const lastMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
    let mockReply = "Hello! Zentricore Support here. We are happy to assist you with IT Infra, Cloud, or climate cooling HVAC systems. Please complete our Diagnostics panel or contact us using our inquiry forms.";
    if (lastMsg.includes("price") || lastMsg.includes("cost")) {
      mockReply = "Our enterprise components, licensing, and systems hardware catalogs are listed in Kenya Shillings (KSH) in our IT Shop on this page. Feel free to add components to your proposal!";
    }
    return res.json({
      text: `[MOCK MODE - Please configure your GEMINI_API_KEY in Settings > Secrets to enable real AI Chat] ${mockReply}`,
    });
  }

  try {
    // Map history to the structured parts array for gemini-3.5-flash
    const formattedHistory = messages.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory,
      config: {
        systemInstruction:
          "You are Joan, a highly certified, enterprise systems administrator and climate engineer at Zentricore IT Solutions. " +
          "Your tone should be authoritative, highly professional, technically precise (using concepts like server clusters, active directory, CASB policies, structured cabling, precision CRAC systems, or VRF refrigeration), yet approachable. " +
          "Focus on explaining Zentricore's turn-key engineering solutions. Guide the customer toward filling out our customized system proposals or scheduling on-site dispatches.",
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini Chat API Error:", err);
    res.status(500).json({ error: "Failed to generate AI chat response.", details: err.message });
  }
});

// 2. Comprehensive AI Systems Diagnostics Endpoint
app.post("/api/diagnose", async (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: "Diagnostic answers are required." });
  }

  if (!ai) {
    // Graceful fallback JSON
    return res.json({
      riskLevel: "medium",
      riskTitle: "System Evaluation Warning (Mock Mode)",
      safetyRating: "75%",
      analysisSummary: "[MOCK Fallback - Enable GEMINI_API_KEY in Secrets for detailed AI evaluation] Your reported symptom shows potential operational limits. Further technical telemetry verification is required.",
      rootCauses: [
        "Clogged or degraded air filter restricting thermal circulation",
        "Aging capacitor or high compressor operating temperatures",
        "Network switch port flapping or physical patch cable damage"
      ],
      dynamicChecklist: [
        "Safely power cycle the unit thermostat or network switch",
        "Inspect the physical filters for excessive debris or dust buildup",
        "Verify standard utility electrical line levels and breaker fuses",
        "Schedule a comprehensive Zentricore systems audit"
      ],
      pricingEstimate: "Approx. 5,000 KSH - 15,000 KSH depending on replacement components",
      recommendation: "Please book a certified technician to inspect your configuration and verify system thresholds.",
    });
  }

  try {
    const prompt = `Perform a highly specialized systems engineering analysis for the following diagnostic parameters:
${JSON.stringify(answers, null, 2)}

Calculate risk, safety rating, analyze potential root causes, provide a custom troubleshooting checklist, pricing estimate, and specific recommendations in Kenyan Shillings (KSH) or USD.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "'low' | 'medium' | 'high'" },
            riskTitle: { type: Type.STRING },
            safetyRating: { type: Type.STRING },
            analysisSummary: { type: Type.STRING },
            rootCauses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 potential technical root causes",
            },
            dynamicChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 specialized diagnostic/mitigation action items",
            },
            pricingEstimate: { type: Type.STRING, description: "Realistic estimated range in KSH" },
            recommendation: { type: Type.STRING },
          },
          required: [
            "riskLevel",
            "riskTitle",
            "safetyRating",
            "analysisSummary",
            "rootCauses",
            "dynamicChecklist",
            "pricingEstimate",
            "recommendation",
          ],
        },
        systemInstruction:
          "You are the Chief Technology Officer and Principal Environmental HVAC Engineer at Zentricore IT Solutions. " +
          "Your job is to read user-submitted symptom checks (whether IT network dropouts, high thermal server slowdowns, server room HVAC cooling failures, or cybersecurity alerts) " +
          "and generate a robust, certified, deep analytical report in JSON format. Provide highly technical, realistic feedback that builds authority.",
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("Gemini Diagnostics API Error:", err);
    res.status(500).json({ error: "Failed to generate system diagnosis.", details: err.message });
  }
});

// 3. AI Knowledge Base - Ask Systems Architect Endpoint
app.post("/api/kb-ask", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  if (!ai) {
    return res.json({
      text: "[MOCK MODE - Please configure GEMINI_API_KEY to search our AI index] Zentricore's systems catalog recommends standard structured layouts, Category 6A cabling, and precision CRAC airflow design. Please look at our listed articles below for specific procedures.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Client Question: "${query}"\n\nProvide a technical response citing relevant structural standards, checklists, or steps.`,
      config: {
        systemInstruction:
          "You are the Principal Systems Architect at Zentricore IT Solutions. " +
          "Provide highly descriptive, structured, professional step-by-step guidance on complex IT topology, fiber optics, Active Directory forests, server room environmental control, or commercial VRF/split HVAC layouts. " +
          "Include bullet points and cite standards like TIA-568, ASHRAE, or ISO. Keep your output to ~200 words max.",
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini KB Ask Error:", err);
    res.status(500).json({ error: "Failed to process question.", details: err.message });
  }
});

// Start server and handle Vite development mode integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static files directory served in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running and listening on port ${PORT}`);
  });
}

startServer();
