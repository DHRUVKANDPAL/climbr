import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

export default async function swot(
  prev_strength: string,
  prev_weakness: string,
  prev_opportunity: string,
  prev_threat: string,
  context: string,
) {
  const prompt = `
Based on the provided SWOT analysis and the context of correct and incorrect questions from different topics, generate a new detailed SWOT analysis with a minimum of 7000 tokens:

### **Input Data:**
**Previous SWOT Analysis:**
- **Strengths:** ${prev_strength}
- **Weaknesses:** ${prev_weakness}
- **Opportunities:** ${prev_opportunity}
- **Threats:** ${prev_threat}

**Performance Context:**
${context}

### **Guidelines for SWOT Generation:**
1. **Strengths:** Identify key areas where the user consistently performs well and exhibits strong understanding. Provide highly detailed insights into specific topics and subtopics where performance is consistently high. Include examples, explanations, and analysis of past performance.
2. **Weaknesses:** Highlight topics where mistakes are frequently made or understanding is lacking. Describe the nature of errors, such as conceptual misunderstandings, calculation errors, or misinterpretation of questions. Provide detailed examples and recommendations for improvement.
3. **Opportunities:** Suggest areas where improvement can lead to significant growth based on trends in question performance. Explain how focusing on these areas can enhance overall competency and link them to related subjects that can be leveraged for better performance. Provide references to study resources and techniques.
4. **Threats:** Identify potential risks if weaknesses persist, such as related topics that might also be impacted. Discuss how gaps in understanding can lead to cascading difficulties in other subjects and suggest mitigation strategies. Provide preventative measures and risk management techniques.

### **Expected Output Format:**
\`\`\`json
{
  "strengths": "Provide a highly detailed breakdown of the user's key strengths, with in-depth subject mastery analysis, examples, and contextual performance insights.",
  "weaknesses": "Elaborate extensively on specific weaknesses, detailing recurring mistakes, misunderstood concepts, and areas requiring improvement, with examples and strategies.",
  "opportunities": "Highlight opportunities for growth by focusing on key improvement areas, with actionable insights, reference materials, and learning strategies.",
  "threats": "Describe potential risks and challenges that may arise from existing weaknesses, provide interconnections to other subjects, and suggest detailed mitigation strategies."
}
\`\`\`
Ensure the response is in **strict JSON format** without any additional text and meets the minimum requirement of **7000 tokens**.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strengths: {
            type: Type.STRING,
            description:
              "A highly detailed breakdown of the user's strengths, including subject mastery, speed, accuracy, conceptual clarity, and contextual performance insights.",
          },
          weaknesses: {
            type: Type.STRING,
            description:
              "An extensively detailed analysis of the user's weaknesses, specifying recurring errors, misunderstood concepts, improvement areas, examples, and corrective strategies.",
          },
          opportunities: {
            type: Type.STRING,
            description:
              "A thorough exploration of potential growth areas, providing actionable recommendations, references to study materials, and broader learning benefits.",
          },
          threats: {
            type: Type.STRING,
            description:
              "A detailed assessment of risks that could hinder progress, with an emphasis on interconnected weaknesses, suggested mitigation strategies, and risk management techniques.",
          },
        },
        required: ["strengths", "weaknesses", "opportunities", "threats"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Response text is undefined");
  }

  console.debug(response.text);
  const JSONResponse = JSON.parse(response.text);
  return JSONResponse;
}


// swot(
//   "Strong conceptual understanding of Sorting algorithms, Graph traversal (DFS, BFS), and Dynamic Programming.",
//   "Struggles with Bit Manipulation, advanced Tree-based problems, and optimization techniques in DP.",
//   "Opportunity to improve in mathematical reasoning and combinatorics, which frequently appear in competitive exams.",
//   "Risk of losing marks due to misreading questions, time management issues, and lack of structured revision strategy.",
//   "Previous performance shows high accuracy in pattern-based problems but frequent errors in boundary conditions.",
// );