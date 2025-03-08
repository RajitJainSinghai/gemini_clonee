import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-2.0-flash-exp";
  const API_KEY = "AIzaSyBZJ-s7PvECQn18SHgAe4QhQKVOguc_MRM"
 
  async function run(Prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME})

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(Prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
     
  }
  
  export default run;