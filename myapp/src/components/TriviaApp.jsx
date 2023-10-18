import { useEffect, useState } from "react";
// import { getTriviaQuestions } from "../services/api";
// import { shuffleArray } from "../utils/shuffleArray";
import { fetchTrivia } from "../services/fetchTrivia";
import RenderQuestion from "./RenderQuestion";
import QuestionNavigation from "./QuestionNavigation";
import ShowScore from './ShowScore';
import HomePage from "./HomePage";
import {
  goToNextQuestion,
  goToPreviousQuestion,
  areAllQuestionsAnswered,
} from "../utils/questionNavigation";

function HomeButton({ onHomeClick }) {
  return (
    <button className="home-button" onClick={onHomeClick}>
      Home
    </button>
  );
}

function TriviaApp() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  // console.log("User Answer is: ", userAnswers)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true); 
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    async function initializeTrivia() {
      try {
        const shuffledQuestions = await fetchTrivia(); // Call the fetchTrivia function
        setQuestions(shuffledQuestions);
        setUserAnswers(shuffledQuestions.map((_) => undefined));
      } catch (error) {
        console.error(error);
      }
    }
    initializeTrivia();
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
    {isHomePage ? (
      <HomePage onStartClick={() => setIsHomePage(false)} />
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
        <>
          {/* <HomeButton onHomeClick={() => setIsHomePage(true)} /> */}
          <ShowScore
            questions={questions}
            userAnswers={userAnswers}
          />
        </>
      )}
    </div>
    )}
    </div>
  );
}

export default TriviaApp;