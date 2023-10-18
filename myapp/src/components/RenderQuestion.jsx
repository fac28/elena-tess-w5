import PropTypes from "prop-types";
import { decode } from "html-entities";

const RenderQuestion = ({ question, currentSelection, handleAnswerChange }) => {
  return (
    <div className="question_container">
      <h3>Question: {decode(question.question)}</h3>
      <div className="question_answers">
        {question.answers.map((answer, index) => (
          <label className="answer" key={index}>
            <input
              type="radio"
              checked={answer == currentSelection}
              name={`question${question.question}`}
              value={answer}
              onChange={() => handleAnswerChange(answer)}
            />
            {decode(answer)}
          </label>
        ))}
      </div>
    </div>
  );
};

RenderQuestion.propTypes = {
  question: PropTypes.object.isRequired, // Make sure question is an object
  currentSelection: PropTypes.string,
  handleAnswerChange: PropTypes.func.isRequired,
};

export default RenderQuestion;
