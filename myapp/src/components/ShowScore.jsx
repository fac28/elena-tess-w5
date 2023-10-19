import PropTypes from "prop-types";
import { decode } from "html-entities";

const ShowScore = ({ questions, userAnswers }) => {
  const scoreArray = userAnswers.map((userAnswer, index) => ({
    question: questions[index],
    userAnswer,
    isCorrect: userAnswer === questions[index].correct_answer,
  }));

  const finalScore = scoreArray.filter((score) => score.isCorrect).length;

  return (
    <div>

      <h1 className="your_score">You scored {finalScore} points!</h1>
      <h2 className="results_title">Questions and Answers:</h2>
      <ul className="results">
        {scoreArray.map((score, index) => (
          <li key={index} style={{ color: score.isCorrect ? "green" : "red" }}>
            {decode(score.question.question)}
            <br />
            {decode(score.question.correct_answer)}
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
