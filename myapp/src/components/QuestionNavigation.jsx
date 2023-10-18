import React from "react";

function QuestionNavigation({
  goToPreviousQuestion,
  goToNextQuestion,
  handleSubmit,
  isPreviousDisabled,
  isNextDisabled,
  isSubmitDisabled,
}) {
  return (
    <div>
      <button onClick={goToPreviousQuestion} disabled={isPreviousDisabled}>
        Previous Question
      </button>
      <button onClick={goToNextQuestion} disabled={isNextDisabled}>
        Next Question
      </button>
      <button onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit
      </button>
    </div>
  );
}

export default QuestionNavigation;
