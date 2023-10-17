import { useEffect, useState } from "react";
import { getTriviaQuestions } from "../services/api";
import { shuffleArray } from "../utils/shuffleArray";

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
      <ul>
        {questions.map(question => (
          <li key={question.question}>
            <h3>Question: {question.question}</h3>
            <div>
              {
              question.answers.map((answer, index) => (
                <label key={answer}>
                  <input
                    type="radio"
                    name={`question${question.question}`}
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(index, e.target.value)
                    }
                  />
                  {answer}
                </label>
           
              ))}
            </div>
            <p>Correct Answer: {question.correct_answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TriviaApp;
