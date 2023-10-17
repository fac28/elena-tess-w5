import { useEffect, useState } from "react";
import { getTriviaQuestions } from "../services/api";

function TriviaApp() {
  const [questions, setQuestions] = useState([]);
    // console.log(questions)
  useEffect(() => {
    async function fetchTrivia() {
      try {
        const data = await getTriviaQuestions()
        setQuestions(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrivia();
  }, []);

  return (
    <div>
      <h1>Trivia Questions</h1>
      <ul>
        {questions.map(question => (
          <li key={question.question}>
            <h3>Question: {question.question}</h3>
            <>Incorrect Answers: {question.incorrect_answers.map(item => item + " ")}</>
            <p>Correct Answer: {question.correct_answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TriviaApp;