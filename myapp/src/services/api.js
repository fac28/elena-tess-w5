const BASE_URL = `https://opentdb.com/api.php`;
const BASE_PARAMS = {
  amount: 10,
  type: "multiple",
};

const CATEGORY_IDS = {
  general_knowledge: 9,
  books: 10,
  film: 11,
  music: 12,
  board_games: 16,
  computers: 18,
  sports: 21,
  geography: 22,
  history: 23,
};

export const getTriviaQuestions = async (options) => {
  console.log(options);
  const params = { ...BASE_PARAMS };
  if (options["difficulty"]) {
    params["difficulty"] = options["difficulty"];
  }
  if (options["category"] && options["category"] !== "any") {
    params["category"] = CATEGORY_IDS[options["category"]];
  }

  try {
    const response = await fetch(`${BASE_URL}?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error("Error fetching trivia questions: " + error.message);
  }
};
