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
      <button className="btn" onClick={goToPreviousQuestion} disabled={isPreviousDisabled}>
        Previous Question
      </button>
      <button className="btn" onClick={goToNextQuestion} disabled={isNextDisabled}>
        Next Question
      </button>
      <button className="btn" onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit
      </button>
    </div>
  );
}

export default QuestionNavigation;
