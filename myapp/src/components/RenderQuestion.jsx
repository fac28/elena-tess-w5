import PropTypes from 'prop-types';

const RenderQuestion = ({ question, handleAnswerChange }) => {
  return (
    <div>
      <h3>Question: {question.question}</h3>
      <div>
        {question.answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question${question.question}`}
              value={answer}
              onChange={() => handleAnswerChange(answer)}
            />
            {answer}
          </label>
        ))}
      </div>
      <p>Correct Answer: {question.correct_answer}</p>
    </div>
  );
};

RenderQuestion.propTypes = {
  question: PropTypes.object.isRequired, // Make sure question is an object
  handleAnswerChange: PropTypes.func.isRequired,
};

export default RenderQuestion;
