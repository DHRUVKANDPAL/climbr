import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

export default async function generateQuestions(
   numberOfQuestions = 5,
   topic = "Data Structures",
   examName = "GATE 2025",
   sectionType = "MCQ",
   difficulty = "Appropriate for the exam",
) {
   const prompt = `
Generate ${numberOfQuestions} high-quality multiple-choice questions (MCQs) for the '${sectionType}' section of the '${examName}' exam.

### **Guidelines for Question Generation:**  
1. **Relevance:** Each question must be related to the '${topic}' subject and should align with the syllabus of '${examName}'.  
2. **Difficulty Level:** Ensure that the exam is of '${difficulty}' difficulty level.  
3. **Question Structure:** Each question should:  
    - Be conceptually sound and clear.  
    - Have exactly **four answer choices**, with only **one correct answer**.  
    - Include an **explanation** to justify the correct answer.  
4. **Balanced Distribution:** If possible, ensure a mix of different subtopics within '${topic}'.  
5. **Strict JSON Format:** The output **must** strictly follow this structure:

\`\`\`json
{
   "type": "MCQ",
   "questions": [
      {
         "question": "What is the time complexity of binary search?",
         "examId": "${examName}",
         "subject": ["${topic}"],
         "difficulty": "${difficulty}",
         "explanation": "Binary search divides the array into halves, resulting in O(log n) complexity.",
         "questionAnalytic": [],
         "topic": ["Searching Algorithms"],
         "options": [
            { "option": "O(n)", "isCorrect": false },
            { "option": "O(log n)", "isCorrect": true },
            { "option": "O(n log n)", "isCorrect": false },
            { "option": "O(1)", "isCorrect": false }
         ]
      }
   ]
}
\`\`\`
**Important Notes:**  
- Do **NOT** generate duplicate or overly simple questions.  
- The output should be **directly parseable JSON** without additional text.  
- Ensure conceptual accuracy and avoid ambiguous wording.  
- PLEASE PROVIDE EVERY STRING IN MARKDOWN FORMAT.
- The **examId** should be the name of the exam, which is '${examName}'.
- Label question difficulty accordingly as 'Easy', 'Medium', or 'Hard'.
-If the section type is 'Numericals', please generate questions accordingly. and options arrays should contain only one option with the correct answer.
- If the section type is 'MCQ', please generate questions accordingly. and options arrays should contain four options with one correct answer.
Now, generate the ${sectionType} based on the above requirements.
   `;
   const response = await ai.models.generateContent({
     model: "gemini-2.0-flash",
     contents: prompt,
     config: {
       responseMimeType: "application/json",
       responseSchema: {
         type: Type.OBJECT,
         properties: {
           type: {
             type: Type.STRING,
             description: "Specifies the type of response, e.g., 'MCQ'",
             nullable: false,
           },
           questions: {
             type: Type.ARRAY,
             description: "List of generated questions",
             items: {
               type: Type.OBJECT,
               properties: {
                 question: {
                   type: Type.STRING,
                   description: "The actual question text",
                   nullable: false,
                 },
                 examId: {
                   type: Type.STRING,
                   description: "Identifier for the exam",
                   nullable: false,
                 },
                 subject: {
                   type: Type.ARRAY,
                   description: "Subjects associated with the question",
                   items: { type: Type.STRING },
                   nullable: false,
                 },
                 difficulty: {
                   type: Type.STRING,
                   description: "Difficulty level (Easy, Medium, Hard)",
                   nullable: false,
                 },
                 explanation: {
                   type: Type.STRING,
                   description: "Detailed explanation of the answer",
                   nullable: false,
                 },
                 questionAnalytic: {
                   type: Type.ARRAY,
                   description: "Tags/analytics for question analysis",
                   items: { type: Type.STRING },
                   nullable: true,
                 },
                 topic: {
                   type: Type.ARRAY,
                   description: "List of topics covered",
                   items: { type: Type.STRING },
                   nullable: false,
                 },
                 options: {
                   type: Type.ARRAY,
                   description: "Answer choices for the question",
                   items: {
                     type: Type.OBJECT,
                     properties: {
                       option: {
                         type: Type.STRING,
                         description: "Text of the answer choice",
                         nullable: false,
                       },
                       isCorrect: {
                         type: Type.BOOLEAN,
                         description: "Indicates if this option is correct",
                         nullable: false,
                       },
                     },
                     required: ["option", "isCorrect"],
                   },
                 },
               },
               required: [
                 "question",
                 "examId",
                 "subject",
                 "difficulty",
                 "explanation",
                 "questionAnalytic",
                 "topic",
                 "options",
               ],
             },
           },
         },
         required: ["type", "questions"],
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



// generateQuestions(5, "Data Structures", "GATE 2025", "MCQ", "Appropriate for the exam")

