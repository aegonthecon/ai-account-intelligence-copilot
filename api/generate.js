import { readFileSync } from 'fs';
const demoData = JSON.parse(readFileSync(new URL('../demoData.json', import.meta.url), 'utf-8'));
import fetch from 'node-fetch';

/**
 * Vercel serverless function to proxy Gemini requests.
 * Expects JSON body: { company: string }
 * Returns structured JSON according to the output schema.
 * On any error or quota issue, falls back to demo data.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { company } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  

  // If no API key, return demo data for the requested company if it exists
  if (!apiKey) {
    const fallback = demoData[company] || demoData['HubSpot'];
    return res.status(200).json({ ...fallback, fallback: true, source: 'demo' });
  }

  // Build Gemini request payload
  const prompt = `You are an AI sales copilot. Produce a JSON object with the following keys:
- companyOverview
- painPoints (array of strings)
- solutionMapping (array of strings)
- outreachEmail (string)
- linkedInMessage (string)
- meetingPreparationBrief (string)
- recommendedNextAction (string)
- icpFitScore (0-100)
- icpFitReasoning (object with positiveIndicators, riskFactors, priorityClassification)

Gather publicly available information about the company named "${company}" from its website, about page, recent news, and any public data. Cite sources as URLs in an array called "sources".

If you cannot retrieve live data, return the demo entry for the company if available.

Return ONLY valid JSON.`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
    });
    const data = await response.json();
    const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generated) throw new Error('No generated content');
    const cleaned = generated
      .replace(/^```json\s*/i, '')
      .replace(/^`\s*/i, '')
      .replace(/```$/g, '')
      .trim();
    const parsed = JSON.parse(cleaned);
    return res.status(200).json({ ...parsed, fallback: false, source: 'live' });
  } catch (e) {
console.error('Gemini fetch error:', e);
    // On any error, return demo fallback
    const fallback = demoData[company] || demoData['HubSpot'];
    return res.status(200).json({ ...fallback, fallback: true, source: 'demo' });
  }
}
