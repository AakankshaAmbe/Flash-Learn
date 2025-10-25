const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize Perplexity client (uses OpenAI SDK)
const perplexityClient = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
});

// Default model for flashcard generation
const PERPLEXITY_MODEL = process.env.PERPLEXITY_MODEL || 'sonar-medium-online';

// Generate flashcards using Perplexity AI
const generateFlashcards = async (topicName, topicType = 'both') => {
  try {
    console.log(`🤖 Generating flashcards for: ${topicName}`);
    
    // Create specific prompts for theory and lab flashcards
    const prompts = {
      theory: `Create detailed theory-based flashcard content for the topic "${topicName}". 
               Focus on key concepts, definitions, laws, and principles. 
               Provide comprehensive explanations that a student can study from.
               Format: Return only the educational content, no extra formatting.`,
      
      lab: `Create practical lab-based flashcard content for the topic "${topicName}". 
            Focus on experiments, procedures, observations, and practical applications. 
            Include step-by-step methods and expected results.
            Format: Return only the educational content, no extra formatting.`
    };

    const results = {};

    // Generate theory flashcard if requested
    if (topicType === 'theory' || topicType === 'both') {
      const theoryResponse = await perplexityClient.chat.completions.create({
        model: PERPLEXITY_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator creating study materials for students. Provide clear, accurate, and comprehensive educational content.'
          },
          {
            role: 'user',
            content: prompts.theory
          }
        ],
        max_tokens: 1000,
        temperature: 0.3, // Lower temperature for more factual content
      });

      results.theory = theoryResponse.choices.message.content.trim();
      console.log('✅ Theory flashcard generated');
    }

    // Generate lab flashcard if requested
    if (topicType === 'lab' || topicType === 'both') {
      const labResponse = await perplexityClient.chat.completions.create({
        model: PERPLEXITY_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert science teacher creating practical lab exercises. Focus on hands-on learning and experimental procedures.'
          },
          {
            role: 'user',
            content: prompts.lab
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });

      results.lab = labResponse.choices.message.content.trim();
      console.log('✅ Lab flashcard generated');
    }

    return results;

  } catch (error) {
    console.error('❌ Perplexity API Error:', error);
    throw new Error('Failed to generate flashcards with AI');
  }
};

module.exports = {
  perplexityClient,
  generateFlashcards,
  PERPLEXITY_MODEL
};