
import { GoogleGenAI, Modality } from "@google/genai";
import type { FilePart } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const editImageWithPrompt = async (
  imagePart: FilePart,
  prompt: string
): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imagePart.data,
              mimeType: imagePart.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Loop through response parts to find the generated image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    return null;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image with Gemini API.");
  }
};
