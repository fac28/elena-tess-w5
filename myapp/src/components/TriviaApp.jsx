import { useEffect, useState } from "react";
import { getTriviaQuestions } from "../services/api";
import { shuffleArray } from "../utils/shuffleArray";
import RenderQuestion from "./RenderQuestion";
import QuestionNavigation from "./QuestionNavigation";
import ShowScore from './ShowScore';
import {
  goToNextQuestion,
  goToPreviousQuestion,
  areAllQuestionsAnswered,
} from "../utils/questionNavigation";


function TriviaApp() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // console.log("User Answer is: ", userAnswers)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true); 

  useEffect(() => {
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
        setQuestions(shuffledQuestions);
        // eslint-disable-next-line no-unused-vars
        setUserAnswers(shuffledQuestions.map((_) => undefined));
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
    //console.log(updatedUserAnswers)
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = () => {
    setShowQuestions(false)
  };

  return (
    <div>
      {showQuestions ? (
        questions.length > 0 ? (
          <>
            <RenderQuestion
              question={questions[currentQuestionIndex]}
              currentSelection={userAnswers[currentQuestionIndex]}
              handleAnswerChange={handleAnswerChange}
            />
            <QuestionNavigation
            goToPreviousQuestion={() =>
              goToPreviousQuestion(currentQuestionIndex, setCurrentQuestionIndex)
            }
            goToNextQuestion={() =>
              goToNextQuestion(
                currentQuestionIndex,
                questions,
                setCurrentQuestionIndex,
              )
            }
            handleSubmit={handleSubmit}
            isPreviousDisabled={currentQuestionIndex === 0}
            isNextDisabled={currentQuestionIndex === questions.length - 1}
            isSubmitDisabled={!areAllQuestionsAnswered(userAnswers, questions)}
          />
        </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <ShowScore
          questions={questions}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
}

export default TriviaApp;