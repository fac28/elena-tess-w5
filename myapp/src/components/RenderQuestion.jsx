import PropTypes from 'prop-types';
import { decode } from 'html-entities';

const RenderQuestion = ({ question, currentSelection, handleAnswerChange }) => {
  return (
    <div>
      <h3>Question: {decode(question.question)}</h3>
      <div>
        {question.answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={answer==currentSelection}
              name={`question${question.question}`}
              value={answer}
              onChange={() => handleAnswerChange(answer)}
            />
            {decode(answer)}
          </label>
        ))}
      </div>
      <p>Correct Answer: {question.correct_answer}</p>
    </div>
  );
};

RenderQuestion.propTypes = {
  question: PropTypes.object.isRequired, // Make sure question is an object
  currentSelection: PropTypes.string,
  handleAnswerChange: PropTypes.func.isRequired,
};

export default RenderQuestion;
