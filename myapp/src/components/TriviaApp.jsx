import { useEffect, useState } from "react";
import { getTriviaQuestions } from "../services/api";
import { shuffleArray } from "../utils/shuffleArray";
import RenderQuestion from "./RenderQuestion";

function TriviaApp() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    async function fetchTrivia() {
      try {
        const data = await getTriviaQuestions()
        const shuffledQuestions = data.results.map((question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          }));
        setQuestions(shuffledQuestions);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrivia();
  }, []);

  
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    // Create a copy of the userAnswers array and update the selected answer for the current question.
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[questionIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
  };


  return (
    <div>
      <RenderQuestion 
        questions={questions} 
        handleAnswerChange={handleAnswerChange}/>
    </div>
  );
}

export default TriviaApp;
