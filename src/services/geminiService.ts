import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async chat(message: string, history: { role: string; parts: { text: string }[] }[] = []) {
    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are Absuuuun, an AI life navigator and personal growth coach. Your goal is to help users navigate life's challenges, set meaningful goals, and stay productive. Be encouraging, insightful, and practical.",
        },
      });

      // Note: sendMessage only accepts message parameter
      const response = await chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  }
};
