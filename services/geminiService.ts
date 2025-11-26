import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production build, ensure process.env.API_KEY is defined in build configuration.
const apiKey = process.env.API_KEY || ''; 
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProfessionalBio = async (
  title: string, 
  company: string, 
  keywords: string
): Promise<string> => {
  
  if (!ai) {
    console.warn("Gemini API Key missing. Returning mock response.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `[AI DEMO MODE] Experienced ${title} at ${company} with a strong focus on ${keywords}. Dedicated to driving innovation and delivering exceptional results in fast-paced environments.`;
  }

  try {
    const prompt = `Write a professional, concise, and engaging bio (max 40 words) for a ${title} working at ${company}. Key skills/focus: ${keywords}. Tone: Professional but approachable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate bio.";
  } catch (error) {
    console.error("Error generating bio:", error);
    return "Error connecting to AI service.";
  }
};