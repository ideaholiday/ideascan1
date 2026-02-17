import { GoogleGenAI, Type } from "@google/genai";
import { BusinessCardData } from "../types";

// Initialize Gemini API
// Note: In a production environment, never expose keys on the client side.
// This is a demo architecture.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const scanBusinessCard = async (base64Image: string): Promise<BusinessCardData> => {
  // Remove data URL prefix if present
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Analyze this business card image and extract the following details into a structured JSON format. 
            If a field is not found, use an empty string. 
            Ensure phone numbers are formatted professionally.
            Address should be the full physical address found.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Full name of the person" },
            jobTitle: { type: Type.STRING, description: "Job title or role" },
            companyName: { type: Type.STRING, description: "Name of the company" },
            phone: { type: Type.STRING, description: "Contact phone number" },
            email: { type: Type.STRING, description: "Email address" },
            address: { type: Type.STRING, description: "Physical office address" },
            website: { type: Type.STRING, description: "Website URL" },
            description: { type: Type.STRING, description: "Brief description of services or tagline if present" }
          },
          required: ["name", "companyName", "email", "phone"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No text returned from Gemini");
    }

    const data = JSON.parse(jsonText) as BusinessCardData;
    return data;

  } catch (error) {
    console.error("Gemini Scan Error:", error);
    throw new Error("Failed to scan card. Please try again.");
  }
};
