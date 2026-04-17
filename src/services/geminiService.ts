
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (ai) return ai;
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey || apiKey === 'your_actual_api_key_here') {
    return null;
  }
  ai = new GoogleGenAI(apiKey);
  return ai;
};

export const generateAIResponse = async (prompt: string, context: string = ''): Promise<string> => {
  try {
    const aiInstance = getAI();
    if (!aiInstance) {
      return "Gemini API key not configured. Please add your VITE_API_KEY to the .env file.";
    }
    const response: GenerateContentResponse = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `System: You are Sustain AI, a helpful eco-assistant. Keep answers short, motivating, and related to sustainability. Context: ${context}\nUser: ${prompt}`,
    });
    return response.text || "I'm having trouble connecting to the eco-grid right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline to save energy. Please try again later.";
  }
};

export const analyzeSustainabilityImage = async (base64Image: string): Promise<{ score: number, analysis: string, title: string }> => {
  try {
    const aiInstance = getAI();
    if (!aiInstance) {
      return { score: 0, title: "Key Missing", analysis: "Please configure your API key in the .env file." };
    }
    const response: GenerateContentResponse = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Analyze this image for sustainability context. Is it an eco-friendly product, a nature scene, or a sustainable action? Provide a JSON response with: 'score' (0-100 integer), 'title' (short string), and 'analysis' (short description under 20 words). If not relevant, score 0."
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);
    return {
      score: json.score || 0,
      title: json.title || "Unknown Item",
      analysis: json.analysis || "Could not analyze image."
    };
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return { score: 0, title: "Error", analysis: "Analysis failed." };
  }
};
