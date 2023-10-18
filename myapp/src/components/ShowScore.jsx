import PropTypes from "prop-types";

const ShowScore = ({questions, userAnswers}) => {
  const correctAnswers = questions.map((question) => question.correct_answer);
  const scoreArray = userAnswers.map((userAnswer, index) => {
    return userAnswer === correctAnswers[index] ? 1 : 0;
  });
  const finalScore = scoreArray.reduce((acc, value) => acc + value, 0);
  
  // console.log(correctAnswers);
  //console.log('Score Array:', scoreArray);
  // console.log("Final Score:", finalScore);

  return (
    <div>
      <h1>You scored {finalScore} points!</h1>
    </div>
  );
};

ShowScore.propTypes = {
  question: PropTypes.object,
  userAnswers: PropTypes.array,
};

export default ShowScore;
