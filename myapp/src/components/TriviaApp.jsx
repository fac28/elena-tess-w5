import { useEffect, useState } from "react";
import { getTriviaQuestions } from "../services/api";
import { shuffleArray } from "../utils/shuffleArray";
import RenderQuestion from "./RenderQuestion";

function TriviaApp() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // console.log("User Answer is: ", userAnswers)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    async function fetchTrivia() {
      try {
        const data = await getTriviaQuestions();
        const shuffledQuestions = data.results.map((question) => ({
          ...question,
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        }));
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrivia();
  }, []);

  const handleAnswerChange = (selectedAnswer) => {
    // Create a copy of the userAnswers array and update the selected answer for the current question.
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
    // console.log(updatedUserAnswers)
    setUserAnswers(updatedUserAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = questions.map(question=>question.correct_answer)
    const scoreArray = userAnswers.map((userAnswer, index) => {
      return userAnswer === correctAnswers[index] ? 1 : 0;
    });
    const finalScore = scoreArray.reduce((acc, value) => acc + value, 0);

    // console.log('Score Array:', scoreArray);
    // console.log('Final Score:', finalScore);

    // something about ShowScore
  };

  return (
    <div>
      {questions.length > 0 ? (
        <RenderQuestion
          question={questions[currentQuestionIndex]}
          handleAnswerChange={handleAnswerChange}
        />
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous Question
        </button>
        <button onClick={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Next Question
        </button>
        <button onClick={handleSubmit} disabled={userAnswers.includes(undefined) || userAnswers.length == 0}>
          Submit</button>
      </div>
    </div>
  );
}

export default TriviaApp;