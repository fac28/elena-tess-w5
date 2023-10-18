import PropTypes from "prop-types";

const ShowScore = ({ questions, userAnswers }) => {
  const scoreArray = userAnswers.map((userAnswer, index) => ({
    question: questions[index],
    userAnswer,
    isCorrect: userAnswer === questions[index].correct_answer,
  }));
  
  const finalScore = scoreArray.filter((score) => score.isCorrect).length;

  return (
    <div>
      <h1>You scored {finalScore} points!</h1>
      <h2>Questions and Answers:</h2>
      <ul>
        {scoreArray.map((score, index) => (
          <li key={index} style={{ color: score.isCorrect ? "green" : "red" }}>
            {score.question.question}
            <br />
            {score.question.correct_answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

ShowScore.propTypes = {
  question: PropTypes.object,
  userAnswers: PropTypes.array,
};

export default ShowScore;
