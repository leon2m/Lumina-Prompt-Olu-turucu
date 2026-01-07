import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptSelections, GeneratedPrompt } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Cinematic title for the video clip (English)" },
    visual_analysis: { type: Type.STRING, description: "Brief analysis of the input image or concept (English)" },
    scene_action: { type: Type.STRING, description: "Description of the movement and action occurring in the video (English)" },
    technical_specifications: {
      type: Type.OBJECT,
      properties: {
        camera: { type: Type.STRING },
        lighting: { type: Type.STRING },
        movement: { type: Type.STRING },
        atmosphere: { type: Type.STRING }
      }
    },
    video_generation_prompt: { type: Type.STRING, description: "The final, optimized prompt for video models like Runway/Pika. Must include subject + motion + style. (English)" },
    negative_prompt: { type: Type.STRING, description: "What to avoid in the video generation (English)" },
    suggested_settings: {
      type: Type.OBJECT,
      properties: {
        motion_bucket_id: { type: Type.NUMBER, description: "1-255 scale for stability vs motion" },
        fps: { type: Type.NUMBER, description: "Frames per second, e.g., 24" }
      }
    }
  },
  required: ["title", "scene_action", "video_generation_prompt", "technical_specifications"]
};

export const generateJsonPrompt = async (
  imageBase64: string | null,
  selections: PromptSelections
): Promise<GeneratedPrompt> => {
  
  const selectedTags = Object.entries(selections)
    .filter(([_, values]) => values.length > 0)
    .map(([key, values]) => {
        // Special formatting for cameraType to ensure it's prioritized
        if (key === 'cameraType') {
            return `CAMERA & LENS: ${values.join(" + ")}`;
        }
        return `${key.toUpperCase()}: ${values.join(", ")}`;
    })
    .join("\n");

  const promptText = `
    Role: You are an expert Video Prompt Engineer for advanced AI Video Models (Runway Gen-2, Pika Labs, Sora, Stable Video Diffusion).

    Task:
    1. Analyze the attached image (if provided) as the **FIRST FRAME** of a video. Determine the subject, setting, and potential motion.
    2. Incorporate the user's STYLISTIC SELECTIONS below to determine the camera movement, lighting, and mood.
    3. Generate a structured JSON output designed to create a high-quality video clip.
    4. **CRITICAL: The user interface is in Turkish, but your JSON Output MUST BE 100% IN ENGLISH.**

    User Selections (Stylistic Overrides):
    ${selectedTags}

    Guidance for 'video_generation_prompt':
    - Structure: [Subject Description] + [Action/Movement] + [Camera Movement] + [Lighting/Atmosphere] + [Style].
    - Example: "A cinematic wide shot of a cyberpunk city street, neon lights reflecting on wet pavement, camera creates a slow dolly zoom towards a mysterious figure, volumetric fog, 8k resolution."
    - Focus heavily on verbs describing motion (e.g., "walking", "flying", "turning", "exploding", "flowing").
    - If 'CAMERA & LENS' is specified, explicitly mention the visual characteristics of that camera (e.g. for 'IMAX', mention 'ultra high resolution, shallow depth of field, epic scale').

    If no image is provided, invent a scene based solely on the selected tags.

    Return ONLY valid JSON.
  `;

  const parts: any[] = [{ text: promptText }];
  
  if (imageBase64) {
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    parts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest', 
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a professional cinematographer and video AI specialist. You always output English JSON.",
        temperature: 0.75
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeneratedPrompt;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};