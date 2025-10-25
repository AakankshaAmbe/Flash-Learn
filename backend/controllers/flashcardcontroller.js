const Flashcard = require("../models/flashcard");
const axios = require("axios");
const { sendSuccess, sendError } = require("../utils/responsehandler");

class FlashcardController {
  // 🔹 Get flashcards by topic
  static async getTopicFlashcards(req, res) {
    try {
      const { topicId } = req.params;
      const flashcards = await Flashcard.getByTopic(topicId);

      return sendSuccess(res, "Flashcards fetched successfully", flashcards);
    } catch (error) {
      console.error(error);
      return sendError(res, "Failed to fetch flashcards", 500, error);
    }
  }

  // 🔹 Generate flashcards for a topic using HuggingFace API
  static async generateFlashcards(req, res) {
    try {
      const { topicId } = req.params;

      const prompt = `Generate 5 simple Q&A flashcards for topic ID: ${topicId}.
Each flashcard should be in the format: 
Q: [question]
A: [answer]`;

      const hfResponse = await axios.post(
        "https://api-inference.huggingface.co/models/gpt-neo-125M",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
        }
      );

      const generatedText =
        hfResponse.data?.[0]?.generated_text || hfResponse.data?.generated_text || "";

      // 🔹 Parse generated text into Q&A flashcards
      const cards = generatedText
        .split("\n")
        .filter((line) => line.trim().startsWith("Q:"))
        .map((line) => ({
          topic_id: topicId,
          type: "Q&A",
          content: line.trim(),
          summary: "",
          keywords: [],
        }));

      // 🔹 Save all cards
      const savedCards = await Promise.all(cards.map((c) => Flashcard.create(c)));

      return sendSuccess(res, "Flashcards generated successfully", savedCards);
    } catch (error) {
      console.error(error);
      return sendError(res, "Failed to generate flashcards", 500, error);
    }
  }
}

module.exports = FlashcardController;
