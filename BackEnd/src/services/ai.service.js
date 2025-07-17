const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: 
    `
    You are an expert code reviewer. Review the following code carefully.

    Identify any issues: bugs, bad practices, inefficiencies, or security flaws.

    Give short and clear feedback explaining the problems.

    If necessary, suggest a corrected or improved version of the code.

    Keep explanations concise but informative.

    Respond in markdown format with clear sections:
    ❌ Issues, ✅ Suggested Fix, and 💡 Improvements (if any).
    `
});

async function generateContent(prompt) {
    const result = await model.generateContent(prompt);

    return result.response.text(); 
}

module.exports = generateContent