import { useMemo } from "react";

export const goToNextQuestion = (
  currentQuestionIndex,
  questions,
  setCurrentQuestionIndex,
) => {
  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

export const goToPreviousQuestion = (
  currentQuestionIndex,
  setCurrentQuestionIndex,
) => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};

export const areAllQuestionsAnswered = (userAnswers, questions) =>
  // useMemo(
  //   () =>
  userAnswers.length === questions.length &&
  userAnswers.every((answer) => answer !== undefined);
// ,
// [questions, userAnswers],
// )
