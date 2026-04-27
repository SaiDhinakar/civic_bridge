const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

console.log('🤖 [GEMINI] Initializing Gemini AI...');

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  [GEMINI] GEMINI_API_KEY not found in .env');
}

try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: process.env.AI_MODEL_VERSION || 'gemini-pro',
  });

  console.log('✅ [GEMINI] Gemini AI initialized with model:', process.env.AI_MODEL_VERSION || 'gemini-pro');

  module.exports = {
    genAI,
    model,
  };
} catch (error) {
  console.error('❌ [GEMINI] Error initializing Gemini:', error.message);
  module.exports = {
    genAI: null,
    model: null,
  };
}
