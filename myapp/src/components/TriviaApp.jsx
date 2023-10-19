import { useEffect, useState } from "react";
import { fetchTrivia } from "../services/fetchTrivia";
import RenderQuestion from "./RenderQuestion";
import QuestionNavigation from "./QuestionNavigation";
import ShowScore from "./ShowScore";
import HomePage from "./HomePage";
import {
  goToNextQuestion,
  goToPreviousQuestion,
  areAllQuestionsAnswered,
} from "../utils/questionNavigation";


function TriviaApp() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isHomePage, setIsHomePage] = useState(true);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({});

  useEffect(() => {
    async function initializeTrivia() {
      try {
        const shuffledQuestions = await fetchTrivia(options); // Call the fetchTrivia function
        setQuestions(shuffledQuestions);
        setUserAnswers(shuffledQuestions.map((_) => undefined));
      } catch (error) {
        console.error(error);
      }
    }
    initializeTrivia();
  }, [count, options]);

  const incrementCount = () => {
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowQuestions(true);
    setIsHomePage(true);
    setCount(count + 1)
}

  const handleAnswerChange = (selectedAnswer) => {
    // Create a copy of the userAnswers array and update the selected answer for the current question.
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = () => {
    setShowQuestions(false);
  };

  return (
    <div>
      {isHomePage ? (
        <HomePage onStartClick={(options) => {
          setIsHomePage(false);
          setOptions(options);
        }} />
      ) : (
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
                    goToPreviousQuestion(
                      currentQuestionIndex,
                      setCurrentQuestionIndex,
                    )
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
                  isSubmitDisabled={
                    !areAllQuestionsAnswered(userAnswers, questions)
                  }
                />
              </>
            ) : (
              <p>Loading...</p>
            )
          ) : (
            <>
              <ShowScore questions={questions} userAnswers={userAnswers} />
              <button onClick={incrementCount}>Reset</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TriviaApp;
