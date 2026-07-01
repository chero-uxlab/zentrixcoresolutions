import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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

// Nodemailer Helper Transporter Configuration
const createMailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    console.log(`[SMTP] Initializing transporter using host=${host}, port=${port}, user=${user}`);
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }
  console.warn(`[SMTP Warning] Transporter is inactive. Missing SMTP credentials. host=${host || 'undefined'}, user=${user || 'undefined'}`);
  return null;
};

// Money Formatter Helper
const formatKSH = (val: number) => {
  return "KSH " + val.toLocaleString("en-KE");
};


// 1. Live Chat Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request structure. 'messages' array is required." });
  }

  if (!ai) {
    // Graceful fallback when API key is missing
    const lastMsg = messages[messages.length - 1]?.text?.toLowerCase() || "";
    let mockReply = "Hello! Zentrixcore Support here. We are happy to assist you with IT Infra, Cloud, or climate cooling HVAC systems. Please complete our Diagnostics panel or contact us using our inquiry forms.";
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
          "You are Joan, a highly certified, enterprise systems administrator and climate engineer at Zentrixcore IT Solutions. " +
          "Your tone should be authoritative, highly professional, technically precise (using concepts like server clusters, active directory, CASB policies, structured cabling, precision CRAC systems, or VRF refrigeration), yet approachable. " +
          "Focus on explaining Zentrixcore's turn-key engineering solutions. Guide the customer toward filling out our customized system proposals or scheduling on-site dispatches.",
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
        "Schedule a comprehensive Zentrixcore systems audit"
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
          "You are the Chief Technology Officer and Principal Environmental HVAC Engineer at Zentrixcore IT Solutions. " +
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
      text: "[MOCK MODE - Please configure GEMINI_API_KEY to search our AI index] Zentrixcore's systems catalog recommends standard structured layouts, Category 6A cabling, and precision CRAC airflow design. Please look at our listed articles below for specific procedures.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Client Question: "${query}"\n\nProvide a technical response citing relevant structural standards, checklists, or steps.`,
      config: {
        systemInstruction:
          "You are the Principal Systems Architect at Zentrixcore IT Solutions. " +
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

// 4. Contact Lead / Inquiry Notification Endpoint
app.post("/api/inquiry", async (req, res) => {
  const { name, company, email, phone, priority, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone contact are required fields." });
  }

  const receiverEmail = process.env.NOTIFICATION_RECEIVER || "chero.joen@gmail.com";
  const recipients = Array.from(new Set([email, receiverEmail].map(e => e.trim()).filter(Boolean))).join(", ");

  const mailOptions = {
    from: process.env.SMTP_USER || "no-reply@zentrixcore.com",
    to: recipients,
    subject: `🚨 [Zentrixcore Inquiry] ${priority ? priority.toUpperCase() : "ROUTINE"} - ${name} (${company || "Individual"})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%); padding: 24px; color: white;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Zentrixcore IT Solutions</h2>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #ccfbf1; font-weight: 600;">NEW LEAD INQUIRY & DISPATCH RECORD</p>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #334155; line-height: 1.6;">
          <h3 style="margin-top: 0; font-size: 14px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; color: #0f172a;">Lead Coordinates</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Contact Name:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Entity / Company:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${company || "N/A (Individual)"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email Address:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0d9488;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone Line:</td>
              <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Dispatch Priority:</td>
              <td style="padding: 6px 0;">
                <span style="background-color: ${priority === 'critical' ? '#fee2e2' : priority === 'urgent' ? '#fef3c7' : '#ccfbf1'}; color: ${priority === 'critical' ? '#991b1b' : priority === 'urgent' ? '#92400e' : '#115e59'}; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                  ${priority || "routine"}
                </span>
              </td>
            </tr>
          </table>

          <h3 style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; color: #0f172a; margin-top: 24px;">Scope Details / Message</h3>
          <blockquote style="margin: 12px 0 0 0; padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #0d9488; font-size: 13px; color: #475569; font-style: italic; border-radius: 8px;">
            ${message ? message.replace(/\n/g, "<br/>") : "No message supplied."}
          </blockquote>
        </div>
        <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: 600;">
          This inquiry was dispatched directly from the Zentrixcore Portal.
        </div>
      </div>
    `
  };

  const transporter = createMailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`[SMTP] Inquiry Notification successfully delivered to: ${recipients}`);
      res.json({ success: true, message: "Email notification dispatched successfully." });
    } catch (err: any) {
      console.error("[SMTP Error] Email delivery failed:", err);
      res.status(500).json({ error: "SMTP transport delivery failed.", details: err.message });
    }
  } else {
    console.log(`[LOG] No SMTP server configured. Printing inquiry details below:\n`, req.body);
    res.json({
      success: true,
      message: "Lead coordinates logged to server console successfully.",
      isMock: true,
    });
  }
});

// 5. Checkout Purchase Order Notification Endpoint
app.post("/api/checkout", async (req, res) => {
  const { customerInfo, payment, cartItems, totalAmount } = req.body;

  if (!customerInfo || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Invalid order structure. customerInfo and cartItems are required." });
  }

  const orderId = `ZEN-2026-${Math.floor(Math.random() * 9000) + 1000}`;
  const receiverEmail = process.env.NOTIFICATION_RECEIVER || "chero.joen@gmail.com";
  const recipients = Array.from(new Set([customerInfo.email, receiverEmail].map(e => e.trim()).filter(Boolean))).join(", ");

  const cartRows = cartItems.map(item => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 12px 0; font-size: 13px; color: #0f172a; font-weight: bold;">
        ${item.name}
        <div style="font-size: 10px; color: #64748b; font-weight: normal; margin-top: 2px;">ID: ${item.id}</div>
      </td>
      <td style="padding: 12px 0; text-align: center; font-size: 13px; font-weight: 700; color: #475569;">${item.quantity}</td>
      <td style="padding: 12px 0; text-align: right; font-size: 13px; font-family: monospace; font-weight: 700; color: #0f172a;">${formatKSH(item.price)}</td>
      <td style="padding: 12px 0; text-align: right; font-size: 13px; font-family: monospace; font-weight: 800; color: #0d9488;">${formatKSH(item.totalPrice)}</td>
    </tr>
  `).join("");

  const mailOptions = {
    from: process.env.SMTP_USER || "no-reply@zentrixcore.com",
    to: recipients,
    subject: `🛒 [Zentrixcore Purchase] Order #${orderId} - ${customerInfo.firstName} ${customerInfo.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #115e59 100%); padding: 28px; color: white;">
          <table style="width: 100%;">
            <tr>
              <td>
                <h2 style="margin: 0; font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Zentrixcore IT Solutions</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #2dd4bf; font-weight: 700;">CONFIRMED ENTERPRISE PROCUREMENT ORDER</p>
              </td>
              <td style="text-align: right; vertical-align: middle;">
                <div style="background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 14px; display: inline-block;">
                  <span style="font-size: 9px; text-transform: uppercase; font-weight: bold; color: #94a3b8; display: block; letter-spacing: 1px; margin-bottom: 2px;">ORDER CODE</span>
                  <span style="font-family: monospace; font-size: 15px; font-weight: 900; color: #2dd4bf;">${orderId}</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
        
        <div style="padding: 28px; background: #ffffff; color: #334155; line-height: 1.6;">
          <h3 style="margin-top: 0; font-size: 14px; font-weight: 800; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; color: #0f172a;">Customer Coordinates</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600; width: 150px;">Customer Name:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0f172a;">${customerInfo.firstName} ${customerInfo.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Corporate Entity:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0f172a;">${customerInfo.company || "N/A (Individual)"}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Primary Email:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0d9488;"><a href="mailto:${customerInfo.email}" style="color: #0d9488; text-decoration: none;">${customerInfo.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Contact Phone:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0f172a;">${customerInfo.phone}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Delivery Address:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0f172a;">${customerInfo.address}, ${customerInfo.city} ${customerInfo.postalCode || ""}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #64748b; font-weight: 600;">Billing Route:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #0f172a; text-transform: uppercase;">${payment.method} ${payment.mpesaPhone ? `(${payment.mpesaPhone})` : ''}</td>
            </tr>
          </table>

          <h3 style="font-size: 14px; font-weight: 800; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase; color: #0f172a; margin-top: 28px;">Procurement Manifest</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="border-bottom: 2px solid #e2e8f0; text-align: left; font-size: 11px; text-transform: uppercase; font-weight: 800; color: #64748b;">
                <th style="padding-bottom: 8px;">Equipment / Service Description</th>
                <th style="padding-bottom: 8px; text-align: center; width: 60px;">Qty</th>
                <th style="padding-bottom: 8px; text-align: right; width: 120px;">Unit Value</th>
                <th style="padding-bottom: 8px; text-align: right; width: 130px;">Extended Value</th>
              </tr>
            </thead>
            <tbody>
              ${cartRows}
              <tr>
                <td colspan="2" style="padding: 16px 0 0 0; border-top: 2px solid #e2e8f0;"></td>
                <td style="padding: 16px 0 0 0; border-top: 2px solid #e2e8f0; text-align: right; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Total Budget:</td>
                <td style="padding: 16px 0 0 0; border-top: 2px solid #e2e8f0; text-align: right; font-size: 16px; font-family: monospace; font-weight: 900; color: #115e59;">${formatKSH(totalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px 28px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: 600;">
          This procurement ticket was submitted on the Zentrixcore Enterprise IT Shop.
        </div>
      </div>
    `
  };

  const transporter = createMailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`[SMTP] Order Confirmation successfully delivered to: ${recipients}`);
      res.json({ success: true, orderId, message: "Purchase order notified to administrator and client successfully." });
    } catch (err: any) {
      console.error("[SMTP Error] Checkout delivery failed:", err);
      res.status(500).json({ error: "SMTP transport delivery failed.", details: err.message });
    }
  } else {
    console.log(`[LOG] No SMTP server configured. Printing order details below:\n`, req.body);
    res.json({
      success: true,
      orderId,
      message: "Order dispatched to server console successfully.",
      isMock: true,
    });
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
