const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple"

export const getTriviaQuestions = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error fetching trivia questions: " + error.message);
  }
};