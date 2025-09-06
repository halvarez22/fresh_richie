import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateSongStory = async (
  songTitle: string,
  songDescription: string
): Promise<string> => {
  const prompt = `Act as an insightful music journalist. Write a short, compelling paragraph (around 60-80 words) that interprets the story and emotion behind a song titled "${songTitle}". The artist's description is: "${songDescription}". Your interpretation should be creative and evocative, exploring the potential narrative or feelings the song conveys. Do not repeat the title or the artist's description. Your tone should be engaging and appreciative.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.85,
            topP: 1,
            topK: 32,
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating song story:", error);
    return "An error occurred while generating the story. Please try again later.";
  }
};
