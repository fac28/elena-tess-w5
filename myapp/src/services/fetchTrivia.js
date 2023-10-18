import { getTriviaQuestions } from "../services/api";
import { shuffleArray } from "../utils/shuffleArray";

async function fetchTrivia() {
  try {
    const data = await getTriviaQuestions();
    const shuffledQuestions = data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
    return shuffledQuestions;
  } catch (error) {
    console.error(error);
    throw error; // You might want to handle errors differently based on your application's needs.
  }
}

export { fetchTrivia };
